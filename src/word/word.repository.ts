import { Collection, DataSource, Repository } from "typeorm";
import { Word } from "./word.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateWordDto } from "./dto/create-word.dto";

export class WordRepository extends Repository<Word> {
    constructor(@InjectRepository(Word) private dataSource: DataSource) {
        super(Word, dataSource.manager)
    }

    async createWord(createWordDto: CreateWordDto): Promise<Word> {
        const { word, meaning, example } = createWordDto; 

        const worditem = this.create({
            word, meaning, example
        })

        await this.save(worditem);

        return worditem; 
    }
}

