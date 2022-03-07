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
exports.CreateTablePosts1646673733612 = void 0;
class CreateTablePosts1646673733612 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
          CREATE TABLE IF NOT EXISTS Posts (
             id INT PRIMARY KEY AUTO_INCREMENT,
             title VARCHAR(255) UNIQUE NOT NULL,
             content VARCHAR(255) NOT NULL,
             userId INT,
             createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
             deletedAt TIMESTAMP,
             FOREIGN KEY (userId) 
                 REFERENCES Users(id)
                 ON DELETE CASCADE
                 ON UPDATE CASCADE
          )
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
          DROP TABLE IF EXISTS Posts
        `);
        });
    }
}
exports.CreateTablePosts1646673733612 = CreateTablePosts1646673733612;
//# sourceMappingURL=1646673733612-CreateTablePosts.js.map