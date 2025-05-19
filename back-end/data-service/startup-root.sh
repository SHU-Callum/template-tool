#!/bin/bash

# Paths to the .env files
UI_ENV="../../front-end/template-tool-ui/.env.development"
DB_ENV="../../.env"
COMBINED_ENV_FILE="./.combined.env"

# Combine the .env files
(cat "$UI_ENV"; echo ""; cat "$DB_ENV") > "$COMBINED_ENV_FILE"

echo "Data Service .env file created in data-service/ $COMBINED_ENV_FILE"
# Load variables from .env file
if [ -f .combined.env ]; then
  export $(cat .combined.env | xargs)
else
  echo ".combined.env file not found! \
  Please ensure you have run merge-env.sh to generate it."
  exit 1
fi

# Check if JAVA is installed
if ! command -v java &> /dev/null; then
  echo "Error: Java is not installed!"
  exit 1
fi

if ! java -version 2>&1 | awk -F '"' '/version/ {if ($2 >= "21") exit 0; else exit 1}'; then
  echo "Error: Java version is less than 21!"
  exit 1
fi

# Run Maven clean build in the data-service directory
mvn clean package
# Exit if build is not successful
if [ $? -ne 0 ]; then
  echo "Error: Maven build failed. Exiting."
  exit 1
fi

# Load variables from .env file
if ! [ -f target/templateTool-data-service-0.0.1-SNAPSHOT.jar ]; then
  echo "jar file not found! \
  Please ensure you have run mvn clean package to generate it."
  exit 1
fi

# Run the JAR file with the arguments
java -jar -DMYSQL_HOST=$MYSQL_HOST -DMYSQL_PORT=$MYSQL_PORT -DMYSQL_DATABASE=$MYSQL_DATABASE -DMYSQL_USER=$MYSQL_USER -DMYSQL_PASSWORD=$MYSQL_PASSWORD -DVITE_UI_URL=$VITE_UI_URL -DVITE_UI_PORT=$VITE_UI_PORT -DVITE_API_HOST=$VITE_API_HOST -DVITE_API_PORT=$VITE_API_PORT -DVITE_ENCRYPT_KEY=$VITE_ENCRYPT_KEY target/templateTool-data-service-0.0.1-SNAPSHOT.jar
