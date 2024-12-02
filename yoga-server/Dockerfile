FROM maven:3.9.8-eclipse-temurin-21
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# RUN ./mvnw dependency:go-offline
COPY src ./src
RUN mkdir -p /upload/info_app
RUN mkdir -p /upload/images
RUN chmod -R 777 /upload

CMD ["./mvnw","spring-boot:run"]
