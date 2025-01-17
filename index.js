"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = require("./routers/userRoute");
const eventRoute_1 = require("./routers/eventRoute");
const categoryRoute_1 = require("./routers/categoryRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,multipart/form-data");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const userRoutes = new userRoute_1.UserRoutes();
const eventRoutes = new eventRoute_1.EventRoutes();
const categoryRoute = new categoryRoute_1.CategoryRoutes();
app.use("/api/users", userRoutes.router);
app.use("/api/categories", categoryRoute.router);
app.use("/api/events", eventRoutes.router);
app.listen(process.env.PORT || 3000);
console.log("Server started on port " + process.env.PORT || 3000);
