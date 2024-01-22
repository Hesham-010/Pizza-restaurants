import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    csurf({ cookie: { httpOnly: true, secure: true, sameSite: 'strict' } }),
  );

  await app.listen(3000);
}
bootstrap();
