import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('records')
export class Record{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    type: string;

    @Column({ type: 'text'})
    name: string;

    @Column({ type: 'decimal' })
    value: number;

    @Column({ type: 'date'})
    date: Date;

    @Column({ type: 'text'})
    observation: string;

    @Column({ type: 'integer' })
    user: number;

}