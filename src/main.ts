import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomHeaderMiddleware } from './_common/middlewares/headers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });

  app.use(new CustomHeaderMiddleware());

  await app.listen(3000);
}
bootstrap();
