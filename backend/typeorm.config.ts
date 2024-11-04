// typeorm.config.ts
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
});

AppDataSource.initialize()
  .then(() => console.log("Data Source inicializado"))
  .catch((err) => console.error("Erro ao inicializar Data Source", err));
