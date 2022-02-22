

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1645472767107 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS People (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(250) NOT NULL,
                lastName VARCHAR(250) NOT NULL
            )
            
        `);
        // eslint-disable-next-line sql/no-unsafe-query
        await queryRunner.query(`
           insert into People VALUES ( null, "Masha", "Leon" )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS People
        `);
    }
}