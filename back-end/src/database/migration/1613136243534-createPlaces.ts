import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createPlaces1613136243534 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "places",
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
            name: "image",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "phone_number",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "rating",
            type: "decimal",
            precision: 2,
            scale: 1,
          },
          {
            name: "city_id",
            type: "uuid",
          },
          {
            name: "categorie_id",
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
      "places",
      new TableForeignKey({
        name: "PlacesCategories",
        columnNames: ["categorie_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "categories",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "places",
      new TableForeignKey({
        name: "PlacesCities",
        columnNames: ["city_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cities",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("places");
  }
}
