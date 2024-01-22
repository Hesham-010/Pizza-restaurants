import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cors, { CorsOptions } from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    // CORS HTTP methods
    methods: ['POST'],
  });

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.use('/graphql', (req, res, next) => {
    cors(corsOptions)(req, res, () => {
      next();
    });
  });

  await app.listen(3000);
}
bootstrap();
