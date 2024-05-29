"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const data_source_1 = require("../data-source");
const eventService_1 = require("../services/eventService");
const event_1 = require("../models/event");
const typeorm_1 = require("typeorm");
const userService_1 = require("../services/userService");
const user_1 = require("../models/user");
class EventController {
    constructor() {
        data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            this.eventService = new eventService_1.EventService(data_source_1.AppDataSource.getRepository(event_1.Event));
            this.userService = new userService_1.UserService(data_source_1.AppDataSource.getRepository(user_1.User));
        }))
            .catch((error) => console.log(error));
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list_events = yield this.eventService.getAllWithCategory({});
                res.json(list_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getFutureEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const list_future_events = yield this.eventService.getAllWithCategory({ user: { id: userId }, date: (0, typeorm_1.MoreThan)(new Date()) });
                res.json(list_future_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getPastEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const list_past_events = yield this.eventService.getAllWithCategory({ user: { id: userId }, date: (0, typeorm_1.LessThan)(new Date()) });
                res.json(list_past_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    countAllEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalEvents = yield this.eventService.countEvents({});
                res.json({ totalEvents });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    countFutureEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const futureEventsCount = yield this.eventService.countEvents({
                    user: { id: userId },
                    date: (0, typeorm_1.MoreThan)(new Date())
                });
                res.json({ futureEventsCount });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    countOrganizers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const organizerCount = yield this.userService.getOrganizers({});
                res.json({ organizerCount });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    countEventsForOrganizer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count_event_organizer = yield this.eventService.count({ user: { id: req.userId }, date: (0, typeorm_1.MoreThan)(new Date()) });
                res.json(count_event_organizer);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getEventCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list_events = yield this.eventService.getAllWithCategory({});
                res.json(list_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getOrganizerEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const my_events = yield this.eventService.getAllWithCategory({ user: { id: req.userId } });
                res.json(my_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateOrganizerEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const event = yield this.eventService.getById({ id: Number(req.params.id) });
                if (((_a = event === null || event === void 0 ? void 0 : event.user) === null || _a === void 0 ? void 0 : _a.id) !== req.userId) {
                    return res.sendStatus(401);
                }
                const e = req.body;
                event.category = e.category || event.category;
                event.title = e.title || event.title;
                event.content = e.content || event.content;
                event.date = e.date || event.date;
                event.location = e.location || event.location;
                event.isFree = e.isFree || event.isFree;
                const updateUser = yield this.eventService.update({ id: Number(req.params.id) }, event);
                res.json(updateUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    participantListEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = Number(req.params.id);
                const verif = yield this.eventService.getById({ user: { id: req.userId }, id: eventId });
                if (!verif) {
                    return res.sendStatus(401);
                }
                const participants = yield this.eventService.getParticipants(eventId);
                res.json(participants);
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: error.message });
            }
        });
    }
    countParticipants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventId = Number(req.params.eventId);
                const verif = yield this.eventService.getById({ user: { id: req.userId }, id: eventId });
                if (!verif) {
                    return res.sendStatus(401);
                }
                const count = yield this.eventService.countParticipants(eventId);
                res.json({ count });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    countParticipantsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryCounts = yield this.eventService.countParticipantsByCategory(Number(req.userId));
                res.json(categoryCounts);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.EventController = EventController;
