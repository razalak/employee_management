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
exports.Line1AndLine2AddedToTheAddress1748190859545 = void 0;
class Line1AndLine2AddedToTheAddress1748190859545 {
    constructor() {
        this.name = 'Line1AndLine2AddedToTheAddress1748190859545';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line1"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line2"`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line_1" character varying`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line_2" character varying`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "houseno" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line_2"`);
            yield queryRunner.query(`ALTER TABLE "address" DROP COLUMN "line_1"`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line2" character varying(255)`);
            yield queryRunner.query(`ALTER TABLE "address" ADD "line1" character varying NOT NULL`);
        });
    }
}
exports.Line1AndLine2AddedToTheAddress1748190859545 = Line1AndLine2AddedToTheAddress1748190859545;
//# sourceMappingURL=1748190859545-line_1-and-line_2-added-to-the-address.js.map