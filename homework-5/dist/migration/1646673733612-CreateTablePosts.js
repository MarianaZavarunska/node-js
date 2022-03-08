"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTablePosts1646673733612 = void 0;
class CreateTablePosts1646673733612 {
    async up(queryRunner) {
        await queryRunner.query(`
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
    }
    async down(queryRunner) {
        await queryRunner.query(`
          DROP TABLE IF EXISTS Posts
        `);
    }
}
exports.CreateTablePosts1646673733612 = CreateTablePosts1646673733612;
//# sourceMappingURL=1646673733612-CreateTablePosts.js.map