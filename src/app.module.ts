import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { CollectionModule } from './collection/collection.module';
import { WordModule } from './word/word.module';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    UserModule,
    CollectionModule,
    WordModule,
  ],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    const options = this.dataSource.options;

    if (this.dataSource.isInitialized) {
      this.logger.log('Database connected successfully!');
      this.logger.log(`Type: ${options.type}`);
      // this.logger.log(`Host: ${options.host}`);
      // this.logger.log(`Port: ${options.port}`);
      this.logger.log(`Database: ${options.database}`);
      // this.logger.log(`Username: ${options.username}`);
    } else {
      this.logger.error('Failed to connect to the database.');
    }
  }
}