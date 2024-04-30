pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    parameters {
        string(name: "SPEC", defaultValue: "cypress/e2e/login/**", description: "cypress/")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox','electron'], description: "elige navegador")
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
                sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }
}