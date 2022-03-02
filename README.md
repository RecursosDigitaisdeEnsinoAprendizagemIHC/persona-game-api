# persona-game-api

## Getting started

First create a .env file in the root directory of the project. Place your configuration in the env file.

Example:

```
MYSQL_ROOT_PASSWORD=pass
MYSQL_DATABASE=persona-game-db
MYSQL_TCP_PORT=5444
AUTH_SECRET=askjds4a20
GAMES_QA_ENDPOINT=http://172.17.0.1:8080
```

Second, run the development server:

```bash
docker-compose up --build
```

The API can be accessed by http://localhost:8000.
