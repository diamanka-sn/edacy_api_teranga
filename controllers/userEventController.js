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
exports.UserEventController = void 0;
const data_source_1 = require("../data-source");
const userEventService_1 = require("../services/userEventService");
const userEvent_1 = require("../models/userEvent");
const event_1 = require("../models/event");
class UserEventController {
    constructor() {
        data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            this.userEventService = new userEventService_1.UserEventService(data_source_1.AppDataSource.getRepository(userEvent_1.UserEvent));
        }))
            .catch((error) => console.log(error));
    }
    registerUserEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const eventRepository = data_source_1.AppDataSource.getRepository(event_1.Event);
                const event = eventRepository.findOne({ where: { id: Number(req.params.id) } });
                if (!event) {
                    return res.status(401).json({ message: "Evenement n'existe pas." });
                }
                const notRegister = yield this.userEventService.notExist({ event: { id: Number(req.params.id) }, user: { id: req.userId } });
                if (!notRegister) {
                    return res.status(401).json({ message: "Vous etes deja inscrit a cet evenement." });
                }
                yield this.userEventService.create({ event: { id: Number(req.params.id) }, user: { id: req.userId } });
                res.sendStatus(201);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserEventController = UserEventController;
