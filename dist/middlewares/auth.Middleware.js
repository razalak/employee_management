"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exceptions/httpException"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const getToken = (req) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        throw new httpException_1.default(401, 'Not Authorized');
    }
    const tokenSplit = token.split(' ');
    console.log(tokenSplit);
    if (tokenSplit.length != 2) {
        throw new httpException_1.default(401, "Not a valid token");
    }
    console.log("token split -- ", tokenSplit);
    return tokenSplit[1];
};
const authMiddleware = (req, res, next) => {
    const token = getToken(req);
    if (!token) {
        throw new httpException_1.default(401, "Not Authorized");
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
        req.user = payload;
        console.log("user-" + JSON.stringify(req.user));
    }
    catch (_a) {
        throw new httpException_1.default(401, "Invalid or Expired token");
    }
    next();
};
exports.default = authMiddleware;
//# sourceMappingURL=auth.Middleware.js.map