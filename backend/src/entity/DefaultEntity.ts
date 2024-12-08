import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DefaultEntity extends BaseEntity {
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // Data de atualização
    updatedAt!: Date;

    constructor() {
        super();
    }
}
