import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTokensTable1648415245658 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS Tokens (
        id INT PRIMARY KEY AUTO_INCREMENT,
        accessToken VARCHAR(255) NOT NULL,
        refreshToken VARCHAR(255) NOT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES Users(id)
        )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXISTS Tokens
        `);
    }
}
