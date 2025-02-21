# FROM openjdk:latest
# WORKDIR /usr/src/myapp
# COPY target/EmailSender-0.0.1-SNAPSHOT.jar /usr/src/myapp/EmailSender-0.0.1-SNAPSHOT.jar
# CMD ["java","-jar","EmailSender-0.0.1-SNAPSHOT.jar"]
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /usr/src/myapp

# Copy the JAR file
COPY target/EmailSender-0.0.1-SNAPSHOT.jar app.jar

# Expose port (if needed)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
