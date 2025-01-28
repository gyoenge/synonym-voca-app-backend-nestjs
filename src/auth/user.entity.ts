import { Collection } from "../collection/collection.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    user_id: number;
    
    @Column()
    username: string;

    @Column()
    password: string; 

    @OneToMany( type => Collection, collection => collection.user, {eager:false})
    collections: Collection[];
}