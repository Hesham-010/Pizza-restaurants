import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  app.use(cookieParser());
  app.use(csurf({ cookie: { sameSite: true } }));

  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;

    next();
  });

  await app.listen(3000);
}
bootstrap();
