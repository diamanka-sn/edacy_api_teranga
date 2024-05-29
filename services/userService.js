"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const AbstarctService_1 = require("./AbstarctService");
class UserService extends AbstarctService_1.AbstractService {
    constructor(repository) {
        super(repository);
    }
}
exports.UserService = UserService;
