# Task 2: Simple Jenkins Pipeline for CI/CD

A Jenkins pipeline that builds, tests, pushes, and deploys a Node.js app using Docker. It starts automatically on every commit to `main`.

## Tools used

- Jenkins (running on an AWS EC2 Ubuntu instance)
- Docker and DockerHub
- Git and GitHub (webhook trigger)
- Node.js demo app

## Project structure

```
.
├── Jenkinsfile        # Pipeline definition (Build, Test, Push, Deploy)
├── Dockerfile         # Image for the Node.js app
├── app.js             # Sample Node.js app
├── package.json
├── test/              # App tests run by the Test stage
└── screenshots/       # Proof of the working pipeline
```

## Pipeline stages

| Stage | What it does |
|---|---|
| **Build** | `docker build` creates the image, tagged with the build number and `latest` |
| **Test** | Runs `npm test` inside the freshly built image |
| **Push** | Logs in to DockerHub with Jenkins credentials and pushes both tags |
| **Deploy** | Stops and removes the old container, then runs the new image on port 3000 |

The Jenkinsfile uses the declarative syntax. The DockerHub login uses `withCredentials`, so no password is stored in the repo.

## Setup steps

1. **Launch an EC2 instance** (Ubuntu) and open ports `22`, `8080` (Jenkins), and `3000` (app) in the security group.
2. **Install Jenkins** and open it at `http://<EC2_PUBLIC_IP>:8080`.
3. **Install Docker and Git** on the server, then let Jenkins use Docker:
   ```bash
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```
4. **Add DockerHub credentials** in Jenkins: *Manage Jenkins → Credentials → Global → Add Credentials*
   - Kind: Username with password
   - Username: DockerHub username, Password: DockerHub access token
   - ID: `dockerhub-creds`
5. **Create the job:** *New Item → Pipeline*
   - Definition: Pipeline script from SCM
   - SCM: Git, Repository URL: this repo, Branch: `*/main`
   - Script Path: `Jenkinsfile`
6. **Enable the trigger** under *Triggers*: tick **GitHub hook trigger for GITScm polling** (and optionally **Poll SCM** with `* * * * *` as a fallback).
7. **Add the GitHub webhook:** repo *Settings → Webhooks → Add webhook*
   - Payload URL: `http://<EC2_PUBLIC_IP>:8080/github-webhook/`
   - Content type: `application/json`, event: push

## How to test

Push any change to main. A new build starts within seconds, the stages turn green in the Stage View, and the app is available at http://<EC2_PUBLIC_IP>:3000. The new image appears on DockerHub with the build number tag and latest.


## Problems I ran into and how I fixed them

- **Jenkinsfile not found:** Linux is case-sensitive, and the Script Path (`Jenkinsfile`) did not match the file name (`JenkinsFile`). I renamed them to match.
- **Build stuck on "Waiting for next available executor":** Jenkins marked the built-in node offline because free disk and `/tmp` space were below its 1 GiB threshold. I lowered the thresholds under *Manage Jenkins → Nodes → Configure Monitors*.
- **`no space left on device` during `docker build`:** the 8 GB root volume was too small. I grew the EBS volume to 20 GB (`growpart` and `resize2fs`) and switched the base image to a smaller one.
- **Docker permission denied:** I added the `jenkins` user to the `docker` group and restarted Jenkins.

