import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.use((req, res, next) => {
    res.header('content-type', 'application/x-www-form-urlencoded');
    res.header('apollo-require-preflight', 'true');
    next();
  });

  await app.listen(3000);
}
bootstrap();
