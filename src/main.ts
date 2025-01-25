import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as config from "config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const swaggerconfig = new DocumentBuilder()
    .setTitle('Synom API Docs')
    .setDescription('synonym voca app API description')
    .setVersion('1.0')
    // .addTag('tag')
    .addBearerAuth() // Bearer Token 인증 추가
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerconfig);
  SwaggerModule.setup('api', app, documentFactory);

  // port 
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);

  // log
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
