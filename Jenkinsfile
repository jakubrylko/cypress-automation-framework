pipeline {
    agent any

    tools {nodejs "node"}

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Name of the branch')
    }

    stages {
        stage('Cypress Parallel Test Suite') {
            parallel {
                stage('Remote Node 1') {
                    agent {
                        label "remote_node1"
                    }
                    steps {
                        git url: 'https://github.com/jakubrylko/cypress-automation-framework.git', branch: params.BRANCH_NAME
                        sh 'npm install'
                        sh 'npm update'
                        sh 'npm run teststore-dashboard'
                    }
                }
            }
        }
    }
}