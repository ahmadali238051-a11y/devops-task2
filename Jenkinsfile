pipeline {
    agent any

    environment {
        IMAGE_NAME = 'w616/nodejs-demo-app'
        IMAGE_TAG  = "${env.BUILD_NUMBER}"
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG -t $IMAGE_NAME:latest .'
            }
        }

        stage('Test') {
            steps {
                sh 'docker run --rm $IMAGE_NAME:$IMAGE_TAG npm test'
            }
        }

        stage('Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                 usernameVariable: 'DH_USER',
                                 passwordVariable: 'DH_PASS')]) {
                    sh '''
                      echo $DH_PASS | docker login -u $DH_USER --password-stdin
                      docker push $IMAGE_NAME:$IMAGE_TAG
                      docker push $IMAGE_NAME:latest
                      docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                  docker stop nodejs-app || true
                  docker rm nodejs-app || true
                  docker run -d --name nodejs-app -p 3000:3000 $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        success { echo 'Pipeline succeeded!' }
        failure { echo 'Pipeline failed, check the console output.' }
    }
}
