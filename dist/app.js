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
const express_1 = __importDefault(require("express"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
const loggerMiddleware_1 = __importDefault(require("./middlewares/loggerMiddleware"));
const processTimeMiddleware_1 = require("./middlewares/processTimeMiddleware");
const data_source_1 = __importDefault(require("./db/data-source"));
const errorHandlingMiddleware_1 = __importDefault(require("./middlewares/errorHandlingMiddleware"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const auth_Middleware_1 = __importDefault(require("./middlewares/auth.Middleware"));
const logger_service_1 = require("./services/logger.service");
const department_routes_1 = __importDefault(require("./routes/department.routes"));
const server = (0, express_1.default)();
const logger = logger_service_1.LoggerService.getInstance('app()');
server.use(express_1.default.json());
server.use(loggerMiddleware_1.default);
server.use(processTimeMiddleware_1.processTimeMiddleware);
server.use("/auth", auth_routes_1.default);
server.use("/employees", auth_Middleware_1.default, employee_routes_1.default);
server.use("/department", department_routes_1.default);
server.use(errorHandlingMiddleware_1.default);
server.get("/", (req, res) => {
    res.status(200).send("Hello world");
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield data_source_1.default.initialize();
        logger.info('connected');
    }
    catch (_a) {
        logger.error('failed to connect to db');
        process.exit(1);
    }
    server.listen(3000, () => {
        logger.info("server listening to 3000");
    });
}))();
//# sourceMappingURL=app.js.map