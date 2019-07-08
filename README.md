# Configuration

## To see the Blueprint of endpoints

Go to [Blueprint](./api/users/blueprint.md)

## To initialize the application

### Create `.env` file 

```
NODE_ENV=development

LOGGER_LEVEL=trace

PORT=3000

SECRET=my_secret_key

SESSION_EXPIRED=30

DATABASE=db/database.db
DATABASE_TEST=db/database_test.db

BACKUP_FILE_LOG=/log/concrete.log
```

### Running on the app

```shell
npm start
```

### Running on the local unit and integration test 

```shell
npm run test:unit
npm run test:integration
```

### Making the build on Heroku

```shell
npm run build
```
