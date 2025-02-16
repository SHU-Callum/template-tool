# Database Setup
- [Home guide](../README.md)

## Database Commands
`cd db`

### Building the docker image
*Required for first time setup or after DB code change*
- `docker build -t template-tool-db-img .`

### Running the docker container
*Starting the database*
- `docker run -d -p 3306:3306 --name template-tool-db-container template-tool-db-img`

### Stopping the container
*Closing the database*
- `docker stop template-tool-db-container`

### Removing the container
*When about to be replaced with a new image build*
- `docker rm template-tool-db-container`

## Connecting with DBeaver
- Server Host: localhost
- Port: 3306
- Username: myuser
- password: mypassword

in driver properties, set `allowPublicKeyRetrieval` to `TRUE`
<br>
This is fine for localhost environment