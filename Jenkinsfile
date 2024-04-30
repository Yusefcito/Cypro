pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    parameters {
    }
    stages{
        stage('Build'){
            steps{
                script{
                    sh "npm install"
                }
                
            }
        }
        stage('Testing'){
            steps{
                script {
                    sh "npx cypress run --record --key 88256a3a-0370-44d5-b6d4-760dff806cee --headless"
                }
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }
}