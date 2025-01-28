import { Collection } from "../collection/collection.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Word extends BaseEntity {
    @PrimaryGeneratedColumn()
    word_id: number; 

    @Column()
    word: string;

    @Column()
    meaning: string; 

    @Column()
    example: string; 

    @ManyToMany(type => Collection, collection => collection.words, {eager:false})
    @JoinTable()
    collections: Collection[];
}