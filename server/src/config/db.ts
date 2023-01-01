import mysql from "mysql";

const db = mysql.createConnection({
  host: "database-1.cxdogurmr268.us-east-1.rds.amazonaws.com",
  post: "3306",
  user: "admin",
  password: "BEs0731l!",
  database: "no_time_zone",
});

db.connect((error) => {
  if (error) {
    console.log(error.message);
    return;
  }
  console.log("DB connected");
});

export default db;
