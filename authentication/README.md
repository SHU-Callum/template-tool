# Authentication Setup
- [Home guide](../../README.md)


## Keycloak Setup
### Run admin console in docker
- `docker run -p 8081:8081 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.1 start-dev --http-port=8081`
- Access in browser via `localhost:8081`

### Run admin console with docker-compose
*In root directory, run:*
- `docker-compose --env-file .env up -d` (also starts the database)

#### To Stop Keycloak Service ####
 - `docker-compose stop template-tool-keycloak`

#### To Remove Keycloak Container ####
- `docker-compose rm template-tool-keycloak`

Data (Realms, users... etc) will remain in database until database is rebuilt