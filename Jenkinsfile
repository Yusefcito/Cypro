pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    parameters {
        string(name: "SPEC", defaultValue: "cypress/", description: "cypress/**")
        choice(name: "BROWSER", choices: ['crhome', 'edge', 'firefox'], description: "elige navegador")
    }
    stages{
        stage('Build'){
            steps{
                echo "Building application"                
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