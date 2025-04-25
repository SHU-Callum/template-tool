# Database Setup
- [Home guide](../../README.md)
- [Back-end guide](../README.md)
  - [Data Service Setup](../data-service/README.md)

## Database Commands (using Docker)
`cd db`

### Building the docker image
*Required for first time setup or after DB code change*
- `export $(cat .env.dev | xargs) && docker build --build-arg MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD --build-arg MYSQL_DATABASE=$MYSQL_DATABASE --build-arg MYSQL_USER=$MYSQL_USER --build-arg MYSQL_PASSWORD=$MYSQL_PASSWORD --build-arg MYSQL_PORT --build-arg MYSQL_HOST -t template-tool-db-img .`

### Running the docker container
*Starting the database*
- `docker run --env-file .env.dev -d -p ${MYSQL_PORT}:${MYSQL_PORT} --name template-tool-db-container template-tool-db-img`

### Stopping the docker container
*Closing the database*
- `docker stop template-tool-db-container`

### Removing the docker container
*When about to be replaced with a new image build*
- `docker rm template-tool-db-container`

## Database Commands (using docker-compose)
*In root directory, run:*

### Building the docker image
*Using environment configuration from **.env.dev***
- `docker-compose --env-file .env build`

### Create Containers and Run
- `docker-compose --env-file .env up -d`

### Run existing containers
- `docker-compose --env-file .env start`

### Stop existing containers
*this will keep the data as is*
- `docker-compose --env-file .env stop`

### Stop and remove containers & volumes
*When you want fresh data next time*
- `docker-compose --env-file .env down -v`

### Troubleshooting
*If encountering issues with running container, run:*
- `docker logs -f template-tool-db-container`

## Connecting with DBeaver
(default settings for .env)
- Server Host: localhost
- Database: devdb
- Port: 3306
- Username: devuser
- password: devpassword

in driver properties, set `allowPublicKeyRetrieval` to `TRUE`
<br>
This is fine for localhost environment