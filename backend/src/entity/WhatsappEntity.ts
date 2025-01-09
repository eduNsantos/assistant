import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from './DefaultEntity';
import { User } from './UserEntity';

@Entity("Whatsapps")
export class WhatsappEntity extends DefaultEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 13, nullable: false })
    number: string;

    @Column({ type: 'varchar', length: 30, default: 'pending', nullable: false })
    status: string;

    @Column({ type: 'int', nullable: false })
    userId: number;

    @ManyToOne(() => User, (user) => user.chatbots)
    @JoinColumn({ name: 'userId' })
    user: User;
}
