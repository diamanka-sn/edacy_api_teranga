"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = __importDefault(require("express"));
const eventController_1 = require("../controllers/eventController");
class EventRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.eventController = new eventController_1.EventController();
        this.configRoutes();
    }
    configRoutes() {
        this.router.get('/', this.eventController.getAll.bind(this.eventController));
        this.router.get('/counts', this.eventController.getEventCategories.bind(this.eventController));
    }
}
exports.EventRoutes = EventRoutes;
