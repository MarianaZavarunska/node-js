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
exports.CreateTableUsers1645472767107 = void 0;
class CreateTableUsers1645472767107 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Wizards (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(25) NOT NULL,
                lastName VARCHAR(25) NOT NULL,
                gender  VARCHAR(25) NOT NULL
            )
            
        `);
            // eslint-disable-next-line sql/no-unsafe-query
            yield queryRunner.query(`
           insert into Wizards VALUES ( null, "Harry", "Potter", "male" )
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
exports.CreateTableUsers1645472767107 = CreateTableUsers1645472767107;
//# sourceMappingURL=1645610056465-Wizards.js.map