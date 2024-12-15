FROM gradle:8.7-jdk21-alpine AS BUILD
COPY . /app
WORKDIR /app
RUN gradle compileJava && gradle build

FROM openjdk:21
COPY --from=BUILD /app/build/libs/gateway-1.0.0.jar /app/gateway-1.0.0.jar
WORKDIR /app
CMD [ "java", "-jar", "gateway-1.0.0.jar"]