FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY target/*.jar app.jar

# Expose port
EXPOSE 8080

# Run with env support
ENTRYPOINT ["sh", "-c", "java -jar app.jar"]