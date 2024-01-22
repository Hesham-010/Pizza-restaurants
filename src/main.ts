import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(csurf());

  // app.use(cookieParser());
  // app.use(
  //   session({
  //     secret: 'your-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );

  // app.use(
  //   csurf({
  //     cookie: {
  //       httpOnly: true,
  //     },
  //   }),
  // );

  await app.listen(3000);
}
bootstrap();
