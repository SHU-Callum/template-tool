# Data Service Setup
- [Home guide](../../README.md)
- [Back-end guide](../README.md)
    - [Database Setup](../db/README.md)

## Version Info
| Name              | Version |
|-------------------|---------|
| Java              | 21      |
| Maven             | 3.8.5   |
| mysql-connector-j | 8.3.0   |
| Lombok            | 1.18.30 |
| Swagger           | 2.8.6   |

 Built with Springboot - 3.4.3 
 -  with spring-boot-starter-security - 3.4.5

 ## Additional Requisites
 - MySQL Database Running



## Running the Data Service in IntelliJ
1. Edit Run Configuration
    - **Use Java 21 SDK**
    - Use Main Method from **TemplateToolApplication**
    - Set Environment Variables to 
      - `template-tool/back-end/db/.env.dev`
      - `template-tool/front-end/template-tool-ui/.env.development`

2. Run as application

## Running as Package
- `mvn clean package`

### Run Application via JAR
1. Ensure `java -version` is jdk-21

2. Run `startup.sh` (if using /db/.env.dev) or `startup-root.sh` (if using ../.env)
    - via Git Bash or Mac - `sh startup.sh`

## Running Swagger-ui
1. Run the project
2. Go to `http://localhost:8080/api/swagger-ui/index.html`
    - Change port to match .env


## Running JUnit Tests (via IntelliJ)
1. Add environment variables in Junit configuration
   - VITE_API_HOST=xxxx;VITE_API_PORT=xxxx;VITE_MOCK_API=xxxx;VITE_ENCRYPT_KEY='xxxx';VITE_UI_URL=xxxx;VITE_UI_PORT=xxxx;MYSQL_DATABASE=xxxx;MYSQL_USER=xxxx;MYSQL_PASSWORD=xxxx;MYSQL_PORT=xxxx;MYSQL_HOST=xxxx
2. Run tests