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
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    // Build Frontend Docker image
                    docker.build("${DOCKER_FRONTEND_IMAGE}:${DOCKER_TAG}", "-f frontend/Dockerfile ./frontend")
                    
                    // Build Backend Docker image
                    docker.build("${DOCKER_BACKEND_IMAGE}:${DOCKER_TAG}", "-f backend/Dockerfile ./backend")
                }
            }
        }
        
        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    // Push Frontend image
                    sh "docker push ${DOCKER_FRONTEND_IMAGE}:${DOCKER_TAG}"
                    
                    // Push Backend image
                    sh "docker push ${DOCKER_BACKEND_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }
    
    post {
        always {
            sh 'docker logout'
            cleanWs()
        }
    }
} 