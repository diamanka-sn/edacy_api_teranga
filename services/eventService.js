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
exports.EventService = void 0;
const AbstarctService_1 = require("./AbstarctService");
const data_source_1 = require("../data-source");
const userEvent_1 = require("../models/userEvent");
class EventService extends AbstarctService_1.AbstractService {
    constructor(repository) {
        super(repository);
    }
    getParticipants(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.getById({ id: eventId });
            if (!event) {
                throw new Error('Event not found');
            }
            const userRepository = data_source_1.AppDataSource.getRepository(userEvent_1.UserEvent);
            const userEvents = yield userRepository.find({ where: { event: { id: eventId } }, relations: ['user'] });
            const participants = userEvents.map(userEvent => userEvent.user);
            return participants;
        });
    }
    countParticipants(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const participants = yield this.getParticipants(eventId);
            return participants.length;
        });
    }
    countParticipantsByCategory(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this.repository.find({ where: { user: { id: userId } }, relations: ['category', 'userEvents'] });
            const categoryCounts = {};
            events.forEach(event => {
                const categoryName = event.category.name;
                const participantCount = event.userEvents.length;
                if (!categoryCounts[categoryName]) {
                    categoryCounts[categoryName] = 0;
                }
                categoryCounts[categoryName] += participantCount;
            });
            return categoryCounts;
        });
    }
}
exports.EventService = EventService;
