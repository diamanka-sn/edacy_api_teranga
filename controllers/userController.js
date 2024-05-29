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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../models/user");
const userService_1 = require("../services/userService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_utils_1 = __importDefault(require("./../utils/jwt.utils"));
class UserController {
    constructor() {
        data_source_1.AppDataSource.initialize()
            .then(() => __awaiter(this, void 0, void 0, function* () {
            this.userService = new userService_1.UserService(data_source_1.AppDataSource.getRepository(user_1.User));
        }))
            .catch((error) => console.log(error));
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const list_events = yield this.userService.getAll({});
                res.json(list_events);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'L\'adresse email et le mot de passe sont requis' });
            }
            try {
                const user = yield this.userService.getByFilter({ email });
                if (!user) {
                    return res.status(401).json({ message: 'Adresse email incorrecte' });
                }
                const passwordVerif = yield bcrypt_1.default.compare(password, user.password);
                if (!passwordVerif) {
                    return res.status(401).json({ message: 'Mot de passe incorrect' });
                }
                const token = jwt_utils_1.default.generateTokenForUser(user);
                return res.status(200).json({ user, token });
            }
            catch (error) {
                return res.status(500).json({ message: 'Erreur serveur' });
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10);
                const user = new user_1.User();
                user.email = req.body.email;
                user.events = [];
                user.firstname = req.body.firstname;
                user.lastname = req.body.lastname;
                user.password = hashedPassword;
                user.phone = req.body.phone;
                const createdUser = yield this.userService.create(user);
                res.status(201).json(createdUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body;
                const u = yield this.userService.getById({ id: req.userId });
                if (!u) {
                    return res.status(404).json({ message: 'Utilisateur introuvable' });
                }
                u.email = user.email ? user.email : u.email;
                u.firstname = user.firstname ? user.firstname : u.firstname;
                u.lastname = user.lastname ? user.lastname : u.lastname;
                u.phone = user.phone ? user.phone : u.phone;
                const updateUser = yield this.userService.update({ id: req.userId }, u);
                res.json(updateUser);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
