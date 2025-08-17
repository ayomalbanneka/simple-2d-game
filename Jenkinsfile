pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ayomalbanneka/simple-2d-game.git'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['2d-game-ec2-ssh-key']) {
                    sh '''
                    scp -o StrictHostKeyChecking=no -r * ubuntu@54.169.160.252/var/www/html/
                    '''
                }
            }
        }
    }
}
