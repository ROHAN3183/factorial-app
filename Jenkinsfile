pipeline {
    agent any

    environment {
        DOCKER_USERNAME = "rohan65"
        IMAGE_NAME = "factorial-app"
        IMAGE_TAG = "latest"
    }

    stages {

        stage('Clone') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                bat 'kubectl config use-context docker-desktop'
                bat 'kubectl apply -f deployment.yaml'
            }
        }
    }
}