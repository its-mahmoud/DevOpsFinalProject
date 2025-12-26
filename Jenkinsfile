pipeline {
    agent any // This specifies that the pipeline can run on any available Jenkins agent.

    environment {
        NEXT_PUBLIC_SUPABASE_URL = credentials('SUPABASE_URL') // Fetch the Supabase URL from Jenkins credentials store.
        NEXT_PUBLIC_SUPABASE_ANON_KEY = credentials('SUPABASE_ANON_KEY') // Fetch the Supabase anon key from Jenkins credentials store.
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker-compose build' // This command will build the Docker image using the docker-compose file.
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker-compose down' // This command stops and removes any running containers.
                sh 'docker-compose up -d' // This command starts the containers in detached mode (background).
            }
        }

        stage('Cleanup Old Images') {
            steps {
                sh 'docker image prune -f' // This command removes any unused Docker images to free up space.
            }
        }
    }
}
