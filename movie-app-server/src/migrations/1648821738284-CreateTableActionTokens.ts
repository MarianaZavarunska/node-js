import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableActionToken1648821738284 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS ActionTokens (
        
        id INT  PRIMARY KEY AUTO_INCREMENT NOT NULL,
        actionToken VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
        deletedAt TIMESTAMP,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES Users(id)
        )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS ActionToken
        `);
    }
}
