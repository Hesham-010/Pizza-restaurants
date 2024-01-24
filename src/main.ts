import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: '*' });

  app.set('view engine', 'ejs');
  app.set('views', 'views');

  app.use('/token', (req, res, next) => {
    res.render('index');
    next();
  });

  await app.listen(3000);
}
bootstrap();
2;
