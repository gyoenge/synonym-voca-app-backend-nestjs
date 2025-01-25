import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CollectionStatus } from "./collection-status.enum";

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
}