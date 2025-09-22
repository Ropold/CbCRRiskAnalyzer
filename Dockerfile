FROM --platform=linux/amd64 openjdk:21
LABEL authors="ropold"
EXPOSE 8080
COPY backend/target/cbcrriskanalyzer.jar cbcrriskanalyzer.jar
ENTRYPOINT ["java", "-jar", "cbcrriskanalyzer.jar"]