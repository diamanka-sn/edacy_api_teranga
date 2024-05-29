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
exports.AbstractService = void 0;
class AbstractService {
    constructor(repository) {
        this.repository = repository;
    }
    getAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.repository.find({ where: filter });
            return list;
        });
    }
    getAllWithCategory(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.repository.find({ where: filter, relations: ['category'] });
            return list;
        });
    }
    // async getAllWithUSER(filter: FindOptionsWhere<T>): Promise<T[]> {
    //     const list: T[] = await this.repository.find({ where: filter, relations: ['category'] });
    //     return list;
    // }
    getAllWith(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.repository.find({ where: filter, relations: ['userEvents'] });
            return list;
        });
    }
    getRelations(filter, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.repository.find({ where: filter, relations: relations });
            return list;
        });
    }
    getById(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.findOneBy(filter);
            return data;
        });
    }
    notExist(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.find({ where: filter });
            return data.length <= 0;
        });
    }
    getByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.findOne({ where: filter });
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.save(data);
            return result;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.repository.delete(id);
            return result;
        });
    }
    update(filter, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.update(filter, data);
            const result = yield this.repository.findOneBy(filter);
            return result;
        });
    }
    count(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield this.repository.count({ where: filter });
            return count;
        });
    }
    countEvents(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const events = yield this.getAll(filter);
            return events.length;
        });
    }
    countCategories(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield this.getAll(filter);
            return categories.length;
        });
    }
    getOrganizers(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.getAll(Object.assign(Object.assign({}, filter), { isOrganizer: 1 }));
            return users.length;
        });
    }
}
exports.AbstractService = AbstractService;
