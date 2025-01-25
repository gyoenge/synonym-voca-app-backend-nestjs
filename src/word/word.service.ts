import { Injectable, NotFoundException } from '@nestjs/common';
import { WordRepository } from './word.repository';
import { CreateWordDto } from './dto/create-word.dto';
import { Word } from './word.entity';

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

        worditem.word = createWordDto.word;
        worditem.meaning = createWordDto.meaning;
        worditem.example = createWordDto.example; 

        await this.wordRepository.save(worditem);

        return worditem; 
    }

}
