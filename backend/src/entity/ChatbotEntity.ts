import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { DefaultEntity } from './DefaultEntity';
import { User } from './UserEntity';

@Entity("Chatbots")
export class Chatbot extends DefaultEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: false })
    behavior: string;

    @Column({ type: 'int', nullable: false }) // 'email' deve ser único
    userId: number;



    @ManyToOne(() => User, (user) => user.chatbots)
    @JoinColumn({ name: 'userId' }) // Liga o campo userId à tabela Users
    user: User;


    // constructor(id: number, name: string, email: string, password: string) {
    //     super();
    // };
}
