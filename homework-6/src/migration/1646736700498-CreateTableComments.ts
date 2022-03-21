import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableComments1646736700498 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
         CREATE TABLE IF NOT EXISTS Comments(
           id INT PRIMARY KEY AUTO_INCREMENT,
           text VARCHAR(250) NOT NULL,
           authorId INT,
           postId INT,
           likes INT  DEFAULT 0 ,
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Comments
        `);
    }
}
