import { Module } from '@nestjs/common';
import { WordController } from './word.controller';
import { WordService } from './word.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordRepository } from './word.repository';
import { CollectionModule } from '../collection/collection.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([Word]),
      CollectionModule
    ],
  controllers: [WordController],
  providers: [WordService, WordRepository]
})
export class WordModule {}
