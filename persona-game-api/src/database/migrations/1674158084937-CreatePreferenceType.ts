import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePreferenceType1674158084937 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "preferences_type",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                },
                {
                    name: "user_preference_id",
                    type: "int"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "value",
                    type: "varchar"
                },
                {
                    name: "input_type",
                    type: "varchar"
                },
                {
                    name: "options",
                    type: "varchar",
                    isNullable: true,
                    default: null
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
              {
                name: "FKUserPreferencesPreferenceType",
                referencedTableName: "user_preferences",
                referencedColumnNames: ["id"],
                columnNames: ["user_preference_id"],
              },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("preferences_type");
    }

}
