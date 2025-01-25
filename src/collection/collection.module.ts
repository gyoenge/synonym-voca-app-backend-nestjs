import { Module } from '@nestjs/common';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';
import { CollectionRepository } from './collection.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collection])
  ],
  controllers: [CollectionController],
  providers: [CollectionService, CollectionRepository],
  exports: [TypeOrmModule]
})
export class CollectionModule {}
