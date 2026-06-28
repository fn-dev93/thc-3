import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from './constants/index';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors(CORS);
  app.use(morgan('dev'));
  app.setGlobalPrefix('api');

  await app.listen(configService.get('PORT') ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
