import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import violatorsRouter from "./src/routes/violators.route.js";
import { realtimeDroneTracker } from "./src/services/drone.services.js";
import { PilotStorage } from "./src/services/PilotStorage.services.js";
import { AppDataSource } from "./src/typeorm/data-source.js";
const port = 8000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/violators", violatorsRouter);
app.listen(port, () => {
    console.log("listening on the port ", port);
});
AppDataSource.initialize()
    .then(() => {
    console.log("db connected");
})
    .catch((err) => {
    console.log("db connection error", err);
});
setInterval(() => {
    PilotStorage.deleteOldData();
    realtimeDroneTracker();
}, 2000);
//# sourceMappingURL=server.js.map