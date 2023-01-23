pipeline {
    agent any

    tools {nodejs "node"}

    parameters {
        string(name: 'Branch_Name', defaultValue: 'main')
    }

    stages {
        stage('Cypress Parallel Test Suite') {
            parallel {
                stage('Remote Node 1') {
                    agent {
                        label "remote_node1"
                    }
                    steps {
                        git url: 'https://github.com/jakubrylko/cypress-automation-framework.git', branch: params.Branch_Name
                        sh 'npm install'
                        sh 'npm update'
                        sh 'npm run ${Script}'
                    }
                }
            }
        }
    }
}