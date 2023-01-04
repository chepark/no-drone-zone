import * as dotenv from "dotenv";
dotenv.config();
import { DataSource } from "typeorm";
import { Pilot } from "./entity/Pilot.js";
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
//# sourceMappingURL=data-source.js.map