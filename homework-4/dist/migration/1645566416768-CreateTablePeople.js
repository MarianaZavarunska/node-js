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
exports.CreateTablePeople1645566416768 = void 0;
class CreateTablePeople1645566416768 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Wizards (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(20) NOT NULL,
                lastName VARCHAR(20) NOT NULL,
                gender VARCHAR(20) NOT NULL
            )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            DROP TABLE IF EXISTS Wizards
        `);
        });
    }
}
exports.CreateTablePeople1645566416768 = CreateTablePeople1645566416768;
//# sourceMappingURL=1645566416768-CreateTablePeople.js.map