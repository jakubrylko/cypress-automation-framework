pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Cypress Parallel Test Suite') {
            parallel {
                stage('Remote Node 1') {
                    agent {
                        label "remote_node1"
                    }
                    steps {
                        git url: 'https://github.com/jakubrylko/cypress-automation-framework.git', branch: 'main'
                        sh 'npm install'
                        sh 'npm update'
                        sh 'npm run teststore-dashboard'
                    }
                }
            }
        }
    }
}