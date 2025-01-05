pipeline {
    agent any
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKER_FRONTEND_IMAGE = 'imdakshitha/maintenance-frontend'
        DOCKER_BACKEND_IMAGE = 'imdakshitha/maintenance-backend'
        DOCKER_TAG = 'latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Frontend Docker image
                    bat "docker build -t ${DOCKER_FRONTEND_IMAGE}:${DOCKER_TAG} -f frontend/Dockerfile ./frontend"
                    
                    // Build Backend Docker image
                    bat "docker build -t ${DOCKER_BACKEND_IMAGE}:${DOCKER_TAG} -f backend/Dockerfile ./backend"
                }
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                bat 'echo %DOCKERHUB_CREDENTIALS_PSW%| docker login -u %DOCKERHUB_CREDENTIALS_USR% --password-stdin'
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    // Push Frontend image
                    bat "docker push ${DOCKER_FRONTEND_IMAGE}:${DOCKER_TAG}"
                    
                    // Push Backend image
                    bat "docker push ${DOCKER_BACKEND_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
    
    post {
        always {
            bat 'docker logout'
            cleanWs()
        }
    }
} 