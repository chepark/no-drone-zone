import * as dotenv from "dotenv";
import mysql from "mysql";
dotenv.config();
// Connect to DB
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
db.connect((error) => {
    if (error) {
        console.log(error.message);
        return;
    }
    console.log("DB connected");
});
export default db;
//# sourceMappingURL=db.js.map