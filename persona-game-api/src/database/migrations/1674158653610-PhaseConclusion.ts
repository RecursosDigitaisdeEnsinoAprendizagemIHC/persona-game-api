import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class PhaseConclusion1674158653610 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('phases', new TableColumn({
            name: 'conclusion',
            type: 'varchar',
            isNullable: true
        }))
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
          "phases",
          "conclusion"
        );
      }

}
