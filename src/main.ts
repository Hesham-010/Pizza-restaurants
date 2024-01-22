import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import cookieParser from 'cookie-parser';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();
