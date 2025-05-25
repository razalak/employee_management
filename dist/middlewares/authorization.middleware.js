"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpException_1 = __importDefault(require("../exceptions/httpException"));
const checkRoles = ((role) => {
    return (req, res, next) => {
        var _a;
        const Role = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        console.log("Role-", Role);
        console.log("role-", role);
        if (Role !== role) {
            throw new httpException_1.default(402, "User has no privilage to access the resource");
        }
        next();
    };
});
exports.default = checkRoles;
//# sourceMappingURL=authorization.middleware.js.map