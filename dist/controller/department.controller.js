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
const httpException_1 = __importDefault(require("../exceptions/httpException"));
const class_validator_1 = require("class-validator");
const create_department_dto_1 = require("../dto/create-department.dto");
const class_transformer_1 = require("class-transformer");
class DepartmentController {
    constructor(departmentservice, router) {
        this.departmentservice = departmentservice;
        this.updateDepartment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const dpt_name = req.body.dpt_name;
                yield this.departmentservice.updateDepartment(id, dpt_name);
                res.status(200).send();
            }
            catch (error) {
                console.error(error);
                next();
            }
        });
        this.deleteDepartmentByID = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield this.departmentservice.deleteDepartmentByID(id);
                res.status(200).send();
            }
            catch (error) {
                next();
            }
        });
        router.get("/", this.getAllDepartment.bind(this));
        router.get("/:id", this.getDepartmentByID.bind(this));
        router.post("/", this.CreateDepartment.bind(this));
        router.put("/:id", this.updateDepartment.bind(this));
        router.delete("/:id", this.deleteDepartmentByID);
    }
    CreateDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const CreateDepartmentDto = (0, class_transformer_1.plainToInstance)(create_department_dto_1.createDepartmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(CreateDepartmentDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new httpException_1.default(400, JSON.stringify(errors));
                }
                const savedDepartment = yield this.departmentservice.createDepartment(CreateDepartmentDto.dpt_name);
                res.status(201).send(savedDepartment);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getAllDepartment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const department = yield this.departmentservice.getAllDepartment();
            res.status(200).send(department);
        });
    }
    getDepartmentByID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                const department = yield this.departmentservice.getDepartmentByID(id);
                if (!department) {
                    throw new httpException_1.default(404, "Department Not Found");
                }
                res.status(200).send(department);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = DepartmentController;
//# sourceMappingURL=department.controller.js.map