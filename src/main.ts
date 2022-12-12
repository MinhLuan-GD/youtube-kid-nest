import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, ORIGIN } = process.env;
  app.enableVersioning();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ORIGIN.split(' '), credentials: true });
  await app.listen(PORT || 8000);
}
bootstrap();
