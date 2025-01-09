import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateWhatsppsTable1733661956348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Whatsapps',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'number',
                    type: 'varchar',
                    length: '13',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '30',
                    isNullable: false
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,

                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP'
                }
            ]
        }));

        await queryRunner.createForeignKey(
            'Whatsapps',
            new TableForeignKey({
                columnNames: ['userId'], // Coluna na tabela atual
                referencedTableName: 'Users', // Tabela referenciada
                referencedColumnNames: ['id'], // Coluna referenciada
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
