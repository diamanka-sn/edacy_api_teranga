"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_1 = require("./models/user");
const event_1 = require("./models/event");
const dotenv_1 = __importDefault(require("dotenv"));
const category_1 = require("./models/category");
const userEvent_1 = require("./models/userEvent");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.HOST_DB || "localhost",
    port: Number(process.env.PORT_DB) || 3306,
    username: process.env.USER_DB || "root",
    password: process.env.PASSWORD_DB || "",
    database: process.env.DB_NAME || "teranga_event_db",
    synchronize: true,
    logging: false,
    entities: [user_1.User, category_1.Category, event_1.Event, userEvent_1.UserEvent],
    migrations: [],
    subscribers: [],
    ssl: true
});
