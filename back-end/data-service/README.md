# Data Service Setup
- [Home guide](../../README.md)
- [Backend guide](../README.md)
    - [Database guide](../db/README.md)

## Version Info
| Name              | Version |
|-------------------|---------|
| Java              | 21      |
| Maven             | 3.8.5   |
| mysql-connector-j | 8.3.0   |
| Lombok            | 1.18.30 |
| Swagger           | 2.8.6   |

 Built with Springboot - 3.4.3  

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

## Running Swagger-ui
1. Run the project
2. Go to `http://localhost:8080/api/swagger-ui/index.html`