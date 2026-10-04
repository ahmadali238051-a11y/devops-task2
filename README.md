
🚀 1. AWS Scalable Infrastructure using Terraform

Infrastructure as Code (IaC) project that automates AWS VPC, networking, and EC2 deployment using Terraform.

📌 2. Description Section

This project provisions a production-like AWS cloud environment using Terraform. It automates the creation of a secure network architecture (VPC, subnets, routing) and deploys an EC2 instance configured as a web server.

🧠 3. Why This Project
    Demonstrates Infrastructure as Code (IaC) using Terraform
    Implements AWS networking concepts (VPC, Subnets, Route Tables)
    Automates cloud provisioning (no manual AWS setup)
    Follows scalable cloud architecture principles


## 🏗️ 4. Architecture Section

Internet
   ↓
Internet Gateway
   ↓
VPC
 ├── Public Subnet
 │     └── EC2 (Web Server)
 └── Route Table
## ⚙️ 5. Tech Stack

Terraform
AWS (EC2, VPC, Subnet, IGW, Route Table)
Linux (Ubuntu)
Git & GitHub
## 📁 6. Project Structure

.
├── main.tf
├── variables.tf
├── outputs.tf
├── provider.tf
├── terraform.tfvars
└── README.md
## 7. How to Run

Step 1: Clone repo
git clone https://github.com/ahmadali238051-a11y/terraform-aws-project
cd terraform-aws-project

Step 2: Initialize Terraform
terraform init

Step 3: Validate
terraform validate

Step 4: Plan
terraform plan

Step 5: Apply
terraform apply
## 🌐 8. Output Section

EC2 Public IP: 3.80.142.75

VPC ID: vpc-0a8b60f0a1035dc02

Instance Running: Nginx web-server
## 📌 9. What I Learned

AWS networking (VPC, Subnetting, Routing)
Terraform modules and state management
Infrastructure automation
Cloud deployment lifecycle