import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "./Record";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ type: 'text'})
    name: string;

    @Column({ type: 'text'})
    email: string;

    @Column({ type: 'text'})
    password: string;

    @OneToMany(()=> Record, record => record.user)
    records: Record[]

}