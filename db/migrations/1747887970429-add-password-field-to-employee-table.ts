import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordFieldToEmployeeTable1747887970429 implements MigrationInterface {
    name = 'AddPasswordFieldToEmployeeTable1747887970429'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying `);
        await queryRunner.query(`update "employee" set "password"='password' where "password" is null`);
        await queryRunner.query(`alter table "employee" alter column "password" set not null`);

        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
     }

}
