import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: "172.17.0.1",
  port: parseInt(process.env.MYSQL_TCP_PORT),
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/entities/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/entities",
  },
})
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error(err);
  });
