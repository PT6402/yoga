FROM mysql:8.0
RUN chown -R mysql:root /var/lib/mysql/

ENV MYSQL_USER=${MYSQL_USERNAME}
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}

# Add initialization script
ADD ./init.sql /docker-entrypoint-initdb.d/data.sql

EXPOSE 3306