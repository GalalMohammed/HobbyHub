-- prepares a PgSQL server for the project
CREATE DATABASE HobbyHub;
CREATE USER alx_dev WITH PASSWORD 'alx_dev_pwd';
Grant all privileges on database HobbyHub to alx_dev;
\c HobbyHub
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC TO alx_dev;