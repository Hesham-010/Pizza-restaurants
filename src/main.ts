import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: { origin: 'https://pizza-restaurants-chd5.onrender.com/' },
  });

  app.use((req, res, next) => {
    res.header('content-type', 'application/json');
    next();
  });

  await app.listen(3000);
}
bootstrap();
