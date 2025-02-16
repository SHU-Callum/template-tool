# Use the official MySQL image from the Docker Hub
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydatabase
ENV MYSQL_USER=myuser
ENV MYSQL_PASSWORD=mypassword

# Initialisation scripts
COPY ./init-scripts/ /docker-entrypoint-initdb.d/

# Expose the default MySQL port
EXPOSE 3306

# Add a custom configuration file (optional)
# COPY my.cnf /etc/mysql/my.cnf

# Start the MySQL server when the container is run
CMD ["mysqld"]