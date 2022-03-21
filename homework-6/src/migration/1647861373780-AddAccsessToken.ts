import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccsessToken1647861373780 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accsessToken VARCHAR(250) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE Tokens DROP COLUMN accsessToken');
    }
}
