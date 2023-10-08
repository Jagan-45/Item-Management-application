
FROM maven:3.8.4-openjdk-17-slim AS builder
WORKDIR /app
RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/Jagan-45/Item-Management-application.git .
RUN mvn clean package

FROM openjdk:17-alpine
WORKDIR /app
COPY --from=builder /app/target/item-0.0.1-SNAPSHOT.jar item.jar
CMD ["java", "-jar", "item.jar"]
