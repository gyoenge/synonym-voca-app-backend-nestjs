import { DataSource, In, Repository } from "typeorm";
import { Word } from "./word.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWordDto } from "./dto/create-word.dto";
import { NotFoundException } from "@nestjs/common";
import { Collection } from "src/collection/collection.entity";
import { CollectionRepository } from "src/collection/collection.repository";

export class WordRepository extends Repository<Word> {
    constructor(
        @InjectRepository(Word) private dataSource: DataSource,
        @InjectRepository(Collection) private readonly collectionRepository: CollectionRepository        
    ) {
        super(Word, dataSource.manager)
    }

    async createWord(createWordDto: CreateWordDto): Promise<Word> {
        const { word, meaning, example, collection_ids } = createWordDto; 

        const worditem = this.create({
            word, meaning, example
        })

        if (collection_ids && collection_ids.length>0) {
            const collections = await this.getCollectionsByIds(collection_ids);
            worditem.collections = collections;
        }

        await this.save(worditem);

        return worditem; 
    }

    async getCollectionsByIds(collection_ids: number[]): Promise<Collection[]> {
        const collections = await this.collectionRepository.findBy({collection_id: In(collection_ids)})

        if (collections.length !== collection_ids.length) {
            throw new NotFoundException('Some collections were not found.')
        }

        return collections;
    }
}

