import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('records')
export class Record{
    @PrimaryGeneratedColumn("uuid")
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

    @ManyToOne(()=> User, (user) => user.records)
    @JoinColumn({ name: 'record_id'})
    user: User;

}