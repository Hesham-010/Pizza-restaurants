import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as expressCsrf from 'express-csrf-protect';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(expressCsrf.enable());

  await app.listen(3000);
}
bootstrap();
