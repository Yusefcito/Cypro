pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    stages{
        stage('Build'){
            environment{
                echo "Building application"
                CYPRESS_RECORD_KEY = credentials('88256a3a-0370-44d5-b6d4-760dff806cee')
            }
        }
        stage('Testing'){
            steps {
                sh 'npm ci'
                sh "npm run test:ci:record"
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }
}