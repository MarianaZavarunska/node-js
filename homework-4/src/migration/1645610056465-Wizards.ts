import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1645472767107 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Wizards (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(25) NOT NULL,
                lastName VARCHAR(25) NOT NULL,
                gender  VARCHAR(25) NOT NULL
            )
            
        `);
        // eslint-disable-next-line sql/no-unsafe-query
        await queryRunner.query(`
           insert into Wizards VALUES ( null, "Harry", "Potter", "male" )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Wizards
        `);
    }
}
