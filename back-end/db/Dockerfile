# Official MySQL image from the Docker Hub
FROM mysql:latest

# Set build arguments
ARG MYSQL_ROOT_PASSWORD
ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_PORT
ARG MYSQL_HOST

# Set environment variables from the .env file
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_PORT=${MYSQL_PORT}
ENV MYSQL_HOST=${MYSQL_HOST}

# Initialisation scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Start the MySQL server when the container is run
CMD ["mysqld"]