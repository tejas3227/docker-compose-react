pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                  docker push tejas85852/react-frontend:latest
                  docker push tejas85852/react-backend:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}

