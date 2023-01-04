"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const violators_route_js_1 = __importDefault(require("./routes/violators.route.js"));
const port = 8000;
const app = (0, express_1.default)();
app.use("/api/violators", violators_route_js_1.default);
app.listen(port, () => {
    console.log("listening on the port ", port);
});
// setInterval(realtimeDroneTracker, 2000);
// fetchAllViolators();
//# sourceMappingURL=index.js.map