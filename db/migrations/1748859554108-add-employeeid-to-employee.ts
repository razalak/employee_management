import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeidToEmployee1748859554108 implements MigrationInterface {
    name = 'AddEmployeeidToEmployee1748859554108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "employee_id" character varying `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "employee_id"`);
    }

}
