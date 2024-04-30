pipeline{
    agent any //permite especificar el pipeline o stages se ejecuten

    paremeters {
        string(name: "SPEC  ", defaultValue: "cypress/e2e/**", description:"Ej: cypress/e2e/login/*.spec.js")
        choice(name: "BROWSER", choices: ['chrome', 'edge', 'firefox'], description: "")

    }

    options{
        ansiColor('xterm')

    }

    stages{
        stage('Build'){
            steps{
                echo "Building application"
            }
        }
       stage('Testing'){
            steps{
                bat "npm i"
                bat "npx run --browser ${BROWSER} --spec ${SPEC}"

            }
        }
        stage('Deploy'){
            steps{
                echo "Deploying the application"
            }
        }
    }
}