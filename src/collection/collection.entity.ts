import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { CollectionStatus } from "./collection-status.enum";
import { User } from "../auth/user.entity";
import { Word } from "../word/word.entity";

@Entity()
export class Collection extends BaseEntity {
    @PrimaryGeneratedColumn()
    collection_id: number; 

    @Column()
    title: string; 

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type: 'enum', enum: CollectionStatus})
    status: CollectionStatus;

    @ManyToOne( type => User, user => user.collections, {eager: false})
    user: User; 

    @RelationId((collection: Collection) => collection.user)
    user_id: number; 

    @ManyToMany( type => Word, word => word.collections, {eager: false})
    words: Word[];
}