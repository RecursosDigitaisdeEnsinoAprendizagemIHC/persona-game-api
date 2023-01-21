import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserPreferences1674152970478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user_preferences",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                    isPrimary: true,
                },
                {
                    name: "user_id",
                    type: "int"
                },
                {
                    name: "name",
                    type: "varchar",
                    default: "Padrão"
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
                name: "FKUserUserPreferences",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
              },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user_preferences");
    }

}
