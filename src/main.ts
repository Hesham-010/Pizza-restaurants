import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(
    session({
      secret: 'your secret string. you can also save it in .env file',
      cookie: {},
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
