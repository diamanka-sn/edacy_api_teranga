"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const eventController_1 = require("../controllers/eventController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userEventController_1 = require("../controllers/userEventController");
class UserRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new userController_1.UserController();
        this.eventController = new eventController_1.EventController();
        this.userEventController = new userEventController_1.UserEventController();
        this.configRoutes();
    }
    configRoutes() {
        this.router.post('/login', this.userController.login.bind(this.userController));
        this.router.post('/register', this.userController.register.bind(this.userController));
        this.router.put('/', authMiddleware_1.default, this.userController.updateUser.bind(this.userController));
        this.router.get('/events/:id/participants', authMiddleware_1.default, this.eventController.participantListEvent.bind(this.eventController));
        this.router.get('/events/participants/category', authMiddleware_1.default, this.eventController.countParticipantsByCategory.bind(this.eventController));
        this.router.get('/events/:id/counts', authMiddleware_1.default, this.eventController.countParticipants.bind(this.eventController));
        this.router.post('/events/:id/register', authMiddleware_1.default, this.userEventController.registerUserEvent.bind(this.userEventController));
        this.router.get('/events/my', authMiddleware_1.default, this.eventController.getOrganizerEvents.bind(this.eventController));
        this.router.put('/events/:id', authMiddleware_1.default, this.eventController.updateOrganizerEvent.bind(this.eventController));
        this.router.get('/events/future', authMiddleware_1.default, this.eventController.getFutureEvent.bind(this.eventController));
        this.router.get('/events/past', authMiddleware_1.default, this.eventController.getPastEvent.bind(this.eventController));
        this.router.get('/events/count', authMiddleware_1.default, this.eventController.countAllEvents.bind(this.eventController));
        this.router.get('/events/organizers/count', authMiddleware_1.default, this.eventController.countOrganizers.bind(this.eventController));
        this.router.get('/events/', authMiddleware_1.default, this.eventController.countOrganizers.bind(this.eventController));
    }
}
exports.UserRoutes = UserRoutes;
