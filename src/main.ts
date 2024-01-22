import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const sessionConfig = session({
    secret: 'somesupersecretsessionsecret',
    resave: false,
    saveUninitialized: false,
    name: 'sessid',
    cookie: {
      maxAge: 2400000,
      sameSite: 'strict',
      httpOnly: true,
      domain: 'localhost',
      secure: false,
    },
  });
  app.use(sessionConfig);

  await app.listen(3000);
}
bootstrap();
