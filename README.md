# Configuration of application

## To initialize the application. 

### Create `.env` file 

```
NODE_ENV=development

POSTGRES_DATABASE=bossabox
POSTGRES_DATABASE_TEST=bossabox_test
POSTGRES_USER=postgres
POSTGRES_PASS=postgres123

LOGGER_LEVEL=trace

PORT=3000
```

## Working with Postgres on Docker

You will need of postgres image personalized, you must run `./build_postgres.sh`, after this, check your containers with `docker ps`. You can see the container postgres running.

### Postgres - Basic Comands

1. Connection on Docker

```bash
docker exec -it {{ container_name }} bash

psql -h localhost -U postgres -W

# password required
```

2. Manipulating postgres database 

```
\l --> to list of databases
\c database_name --> to change of database
\d --> to list of tables
```
