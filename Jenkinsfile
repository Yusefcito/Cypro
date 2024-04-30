pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    parameters {
        string(name: "SPEC", defaultValue: "cypress/e2e/login/**", description: "cypress/")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox'], description: "elige navegador")
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
                    if (isUnix()){
                        sh "npx cypress run --browser ${BROWSER} --spec ${SPEC}"
                    } else {
                    sh "npx cypress run"
                    }
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