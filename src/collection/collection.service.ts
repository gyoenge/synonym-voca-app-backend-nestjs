import { Injectable, NotFoundException } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection } from './collection.entity';
import { CollectionStatus } from './collection-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class CollectionService {
    constructor(
        private collectionRepository: CollectionRepository
    ) {}

    async getAllCollection(user: User): Promise<Collection[]> {
        const query = this.collectionRepository.createQueryBuilder('collection')
        query.where("collection.userUserId = :user_id", {user_id : user.user_id})
        const collections = await query.getMany();

        return collections;
    }

    async getAllPublicCollection(user: User): Promise<Collection[]> {
        const query = this.collectionRepository.createQueryBuilder('collection')
        query.where("collection.userUserId != :user_id", {user_id : user.user_id})
            .andWhere("collection.status = :status", {status: CollectionStatus.PUBLIC})
        const collections = await query.getMany();

        return collections;
    }

    createCollection(createCollectionDto: CreateCollectionDto, user: User): Promise<Collection> {
        return this.collectionRepository.createCollection(createCollectionDto, user);
    }

    async getCollectionById(id: number): Promise<Collection> {
        const found = await this.collectionRepository.findOne({ where: {collection_id: id} });

        if(!found) {
            throw new NotFoundException(`Can't find collection with id ${id}`);
        }

        return found; 
    }

    async deleteCollection(id: number): Promise<void> {
        const result = await this.collectionRepository.delete({collection_id: id});

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find Collection with id ${id}`)
        }
    }

    async updateCollectionStatus(id: number, status: CollectionStatus): Promise<Collection> {
        const collection = await this.getCollectionById(id);

        collection.status = status;
        await this.collectionRepository.save(collection);

        return collection; 
    }

} 
