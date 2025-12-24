pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}
