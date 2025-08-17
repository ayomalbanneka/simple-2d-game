pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Fetching code from GitHub...'
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no -i /var/lib/jenkins/keys/your-key.pem -r * ubuntu@<ec2-public-ip>:/var/www/html
                '''
            }
        }
    }
}
