import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    //Add your origins here
    origin: 'https://pizza-restaurants-chd5.onrender.com/graphql',
  });

  await app.listen(3000);
}
bootstrap();
