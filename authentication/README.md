# Authentication Setup
- [Home guide](../README.md)


## Keycloak Setup
### Run admin console in docker
- `docker run -p 8081:8081 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.2.1 start-dev --http-port=8081`
- Access in browser via `localhost:8081`

### Run admin console with docker-compose
*In root directory, run:*
- `docker-compose --env-file .env up -d` (also starts the database)

#### To Run Only Keycloak Service 
- `docker-compose --env-file .env start template-tool-keycloak`

#### To Stop Keycloak Service
 - `docker-compose stop template-tool-keycloak`

#### To Remove Keycloak Container
- `docker-compose rm template-tool-keycloak`

#### Stop and remove all containers & volumes
*When you want fresh data next time*
- `docker-compose --env-file .env down -v`


Data (Realms, users... etc) will remain in database until database is rebuilt

<hr>

## Exporting Realm & User Data
Make export directory in container
- `docker exec -it keycloak-container mkdir -p /opt/keycloak/data/export`

Full realm export including users
- `docker exec -it keycloak-container /opt/keycloak/bin/kc.sh export --realm template-tool-test-realm --file /opt/keycloak/data/export/template-tool-test-realm.json`

Copy to local from container
- `docker cp keycloak-container:/opt/keycloak/data/export/template-tool-test-realm.json ./authentication/export/template-tool-test-realm.json`

Rename file to template-tool-test-realm-realm

When starting container, ensure json file is in `./authentication/export`

<hr>

## Notes
- Keycloak version: 26.2.1
- Uses JWT for token validation. Valid tokens cache for local validation to reduce latency.