import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
