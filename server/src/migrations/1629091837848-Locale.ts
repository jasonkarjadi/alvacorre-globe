import { MigrationInterface, QueryRunner } from "typeorm";

export class Locale1629091837848 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table locale (iso varchar(2) primary key);
        insert into locale (iso) values ('en');
        insert into locale (iso) values ('jp');
        insert into locale (iso) values ('id');
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
