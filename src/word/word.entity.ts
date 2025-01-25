import { BaseEntity, Collection, Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}