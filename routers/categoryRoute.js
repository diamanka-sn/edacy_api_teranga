"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
class CategoryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.categoryController = new categoryController_1.CategoryController();
        this.configRoutes();
    }
    configRoutes() {
        // this.router.get('/count', this.categoryController.countEventCategories.bind(this.categoryController));
        this.router.get('/', this.categoryController.getAll.bind(this.categoryController));
        this.router.get('/count', this.categoryController.countCategories.bind(this.categoryController));
    }
}
exports.CategoryRoutes = CategoryRoutes;
