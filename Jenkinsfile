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
                withCredentials([usernamePassword(
                    credentialsId: 'docker-cred',   // <-- FIXED
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push %DOCKER_USERNAME%/%IMAGE_NAME%:%IMAGE_TAG%'
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                bat 'kubectl apply -f deployment.yaml --validate=false'
            }
        }
    }

    post {
        always {
            bat 'docker logout'
        }
    }
}