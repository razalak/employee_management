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
exports.AddPasswordFieldToEmployeeTable1747887970429 = void 0;
class AddPasswordFieldToEmployeeTable1747887970429 {
    constructor() {
        this.name = 'AddPasswordFieldToEmployeeTable1747887970429';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying `);
            yield queryRunner.query(`update "employee" set "password"='password' where "password" is null`);
            yield queryRunner.query(`alter table "employee" alter column "password" set not null`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
        });
    }
}
exports.AddPasswordFieldToEmployeeTable1747887970429 = AddPasswordFieldToEmployeeTable1747887970429;
//# sourceMappingURL=1747887970429-add-password-field-to-employee-table.js.map