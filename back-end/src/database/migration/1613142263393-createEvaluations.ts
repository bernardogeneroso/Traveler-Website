import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createEvaluations1613142263393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "evaluations",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isUnique: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "rating",
            type: "int",
          },
          {
            name: "approved",
            type: "int",
          },
          {
            name: "place_id",
            type: "uuid",
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "evaluations",
      new TableForeignKey({
        name: "EvaluationsPlace",
        columnNames: ["place_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "places",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("evaluations");
  }
}
