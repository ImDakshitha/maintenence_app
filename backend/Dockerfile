FROM openjdk:17-alpine
WORKDIR /GSCOMP134
COPY target/*.jar /GSCOMP134/maintenance_app.jar
EXPOSE 8080
ENTRYPOINT [ "java","-jar","/maintenance_app.jar" ]