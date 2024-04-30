pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    parameters {
        string(name: "SPEC", defaultValue: "cypress/e2e/**", description:"Ej: cypress/e2e/login/*.spec.js")
        

    }
    stages{
        stage('Build'){
            steps{
                echo "Building application"
            }
        }
       stage('Testing'){
            steps{
                sh "npm i"
                sh "npx cypress run --record --key 88256a3a-0370-44d5-b6d4-760dff806cee"
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }
}