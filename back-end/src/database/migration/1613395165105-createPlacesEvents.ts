import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class createPlacesEvents1613395165105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "placesevents",
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
            name: "startDay",
            type: "timestamp with time zone",
          },
          {
            name: "endDay",
            type: "timestamp with time zone",
          },
          {
            name: "year",
            type: "varchar",
          },
          {
            name: "place_id",
            type: "uuid",
            isUnique: true,
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
      "placesevents",
      new TableForeignKey({
        name: "PlaceEventsPlace",
        columnNames: ["place_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "places",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("placesevents");
  }
}
