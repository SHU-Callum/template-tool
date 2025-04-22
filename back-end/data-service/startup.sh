#!/bin/bash

# Load variables from .env file
if [ -f .combined.env ]; then
  export $(cat .combined.env | xargs)
else
  echo ".combined.env file not found! \
  Please ensure you have run merge-env.sh to generate it."
  exit 1
fi

# Load variables from .env file
if ! [ -f app.jar ]; then
  echo "jar file not found! \
  Please ensure you have run mvn clean package to generate it."
  exit 1
fi

# Check if JAVA is installed
if ! java -version >/dev/null 2>&1; then
    echo "Error: Java is not NOT installed!"
fi

# Run the JAR file with the arguments
java -jar -DMYSQL_HOST=$MYSQL_HOST -DMYSQL_PORT=$MYSQL_PORT -DMYSQL_DATABASE=$MYSQL_DATABASE -DMYSQL_USER=$MYSQL_USER -DMYSQL_PASSWORD=$MYSQL_PASSWORD -DVITE_UI_URL=$VITE_UI_URL -DVITE_UI_PORT=$VITE_UI_PORT -DVITE_API_HOST=$VITE_API_HOST -DVITE_API_PORT=$VITE_API_PORT -DVITE_ENCRYPT_KEY=$VITE_ENCRYPT_KEY app.jar
