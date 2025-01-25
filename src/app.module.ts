import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { SeedModule } from './database/seed/seed.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    SeedModule,
    CollectionModule
  ],
})
export class AppModule {}
