import { Injectable, NotFoundException } from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { Collection } from './collection.entity';

@Injectable()
export class CollectionService {
    constructor(
        private collectionRepository: CollectionRepository
    ) {}

    createCollection(createCollectionDto: CreateCollectionDto): Promise<Collection> {
        return this.collectionRepository.createCollection(createCollectionDto);
    }

    async getCollectionById(id: number): Promise<Collection> {
        const found = await this.collectionRepository.findOne({ where: {collection_id: id} });

        if(!found) {
            throw new NotFoundException(`Can't find collection with id ${id}`);
        }

        return found; 
    }
} 
