import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'your-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true },
    }),
  );

  app.use(csurf({ cookie: { httpOnly: true } }));

  await app.listen(3000);
}
bootstrap();
