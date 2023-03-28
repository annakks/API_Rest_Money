import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Record } from "./Record";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    name: string;

    @Column({type: 'text', unique: true})
    email: string

    @Column({ type: 'text'})
    password: string;

}