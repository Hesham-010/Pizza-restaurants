import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(csrf({ cookie: true }));

  await app.listen(3000);
}
bootstrap();
