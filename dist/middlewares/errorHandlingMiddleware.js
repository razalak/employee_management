"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exceptions/httpException"));
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof httpException_1.default) {
            const status = error.status || 500;
            const message = error.message || "something went wrong";
            let repbody = { message: message };
            res.status(status).json(repbody);
        }
        else {
            console.error(error.stack);
            res.status(500).send({ error: error.message });
        }
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorHandlingMiddleware.js.map