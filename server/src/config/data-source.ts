import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(path.dirname("../../"), ".env"),
});

import { DataSource } from "typeorm";
import { Pilot } from "../db/entity/Pilot.js";

/**
 * TypeORM configuration to connect to DB.
 */

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Pilot],
  subscribers: [],
  migrations: [],
});
