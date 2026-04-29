# Springtime Backend

Java 17 + Spring Boot backend for the www-travler7282.com monorepo.

## What It Does

- Provides a REST API for greeting, health, and readiness checks
- Used as a backend service for demonstration and health monitoring

## Endpoints

All endpoints are available at both the root and under `/springtime/api/v1`.

### GET /greeting
- Returns a greeting message
- Query param: `name` (optional, default: "World")
- Example: `GET /greeting?name=Michael`
- Response: `{ "id": 1, "content": "Hello, Michael!" }`

### GET /health, /healthz
- Health check endpoints
- Response: `{ "status": "UP" }`

### GET /readyz
- Readiness check endpoint
- Response: `{ "status": "UP" }`

## Running Locally

Build and run with Gradle:
```bash
gradlew bootRun
```

Or build a JAR and run:
```bash
gradlew build
java -jar build/libs/springtime-*.jar
```

## Docker

Build the image:
```bash
docker build -t springtime-backend .
```

Run the container:
```bash
docker run -p 8080:8080 springtime-backend
```
