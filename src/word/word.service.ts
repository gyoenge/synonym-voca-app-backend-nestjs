import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './word.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class WordService {
    constructor(
        private wordRepository: WordRepository
    ) {}

    createWord(createWordDto: CreateWordDto): Promise<Word> {
        return this.wordRepository.createWord(createWordDto);
    }

    async getWordById(id: number): Promise<Word> {
        const found = await this.wordRepository.findOne({ where: {word_id: id}});
        
        if(!found) {
            throw new NotFoundException(`Can't find word with id ${id}`);
        }

        return found;
    }
    
    async deleteWord(id: number): Promise<void> {
        const result = await this.wordRepository.delete({word_id: id});

        if(result.affected === 0) {
            throw new NotFoundException(`Can't find word with id ${id}`);
        }
    }

    async updateWord(id: number, createWordDto: CreateWordDto): Promise<Word> {
        const worditem = await this.getWordById(id);

        worditem.wordname = createWordDto.wordname;
        worditem.pos = createWordDto.pos; 
        worditem.meaning = createWordDto.meaning;
        worditem.example = createWordDto.example; 

        if (createWordDto.collection_ids) {
            const collections = await this.wordRepository.getCollectionsByIds(createWordDto.collection_ids);
            worditem.collections = collections;
        }

        await this.wordRepository.save(worditem);

        return worditem; 
    }

    async getWordsByName(wordname: string): Promise<Word[]> {
        const query = this.wordRepository.createQueryBuilder('word')
        query.andWhere('word.wordname = :word', { word: wordname }) 
        const words = await query.getMany();

        return words;

        // if (!wordname) {
        //     throw new BadRequestException("Invalid wordname: cannot be empty");
        // }
    
        // return this.wordRepository.findBy({ wordname });
    }

    async getWordsByCollectionId(collectionId: number): Promise<Word[]> {
        const query = this.wordRepository.createQueryBuilder('word')
        query.innerJoin('word.collections', 'collections')
            .where('collections.collection_id = :collectionId', { collectionId }) 
        const words = await query.getMany();

        return words;
    }

    async getAllWords(user: User): Promise<Word[]> {
        const query = this.wordRepository.createQueryBuilder('word')
        query.innerJoin('word.collections', 'collections')
            .innerJoin('collections.user', 'user')
            .where('user.user_id = :userId', { userId: user.user_id }) 
        const words = await query.getMany();

        return words;
    }
}
