pipeline {
    agent any

    stages {

        stage('Pull Code') {
            steps {
                git 'git@github.com:its-mahmoud/DevOpsFinalProject.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }


        stage('Cleanup Old Images') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}