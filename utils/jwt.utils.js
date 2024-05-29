"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthService {
    static generateTokenForUser(user) {
        return jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, AuthService.jwtSecret, {
            expiresIn: '48h',
        });
    }
    static parseAuthorization(authorizationHeader) {
        if (authorizationHeader == null) {
            return null;
        }
        const tokenRegex = /Bearer (.+)/;
        const match = authorizationHeader.match(tokenRegex);
        return match != null ? match[1] : null;
    }
    static getUserId(authorization) {
        let userId = -1;
        const token = AuthService.parseAuthorization(authorization);
        if (token !== null) {
            try {
                const jwtToken = jsonwebtoken_1.default.verify(token, AuthService.jwtSecret);
                if (jwtToken !== null)
                    userId = jwtToken.id;
            }
            catch (err) {
                return userId;
            }
        }
        return userId;
    }
}
AuthService.jwtSecret = process.env.JWT_SIGN_SECRET;
exports.default = AuthService;
