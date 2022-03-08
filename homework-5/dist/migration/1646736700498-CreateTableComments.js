"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableComments1646736700498 = void 0;
class CreateTableComments1646736700498 {
    async up(queryRunner) {
        await queryRunner.query(`
         CREATE TABLE IF NOT EXISTS Comments(
           id INT PRIMARY KEY AUTO_INCREMENT,
           text VARCHAR(250) NOT NULL,
           authorId INT,
           postId INT,
           likes INT  DEFAULT 0,
           dislikes INT DEFAULT 0,
           createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
           deletedAt TIMESTAMP,
          FOREIGN KEY (authorId) 
          REFERENCES Users(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
          FOREIGN KEY (postId) 
          REFERENCES Posts(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
         )
       `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Comments
        `);
    }
}
exports.CreateTableComments1646736700498 = CreateTableComments1646736700498;
//# sourceMappingURL=1646736700498-CreateTableComments.js.map