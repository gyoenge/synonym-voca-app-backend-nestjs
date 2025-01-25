import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { CollectionModule } from './collection/collection.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    CollectionModule,
    WordModule
  ],
})
export class AppModule {}
