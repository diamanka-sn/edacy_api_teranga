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
exports.CategoryController = void 0;
const data_source_1 = require("../data-source");
const categoryService_1 = require("../services/categoryService");
const category_1 = require("../models/category");
class CategoryController {
    constructor() {
        data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            this.categoryService = new categoryService_1.CategoryService(data_source_1.AppDataSource.getRepository(category_1.Category));
        }))
            .catch((error) => console.log(error));
    }
    countCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryCount = yield this.categoryService.countCategories({});
                res.json({ categoryCount });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all_categories = yield this.categoryService.getAll({});
                res.json(all_categories);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.CategoryController = CategoryController;
