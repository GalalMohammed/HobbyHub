-- prepares a PgSQL server for the project
CREATE DATABASE hobbyhub;
CREATE USER alx_dev WITH PASSWORD 'alx_dev_pwd';
Grant all privileges on database hobbyhub to alx_dev;
\c hobbyhub
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA PUBLIC TO alx_dev;