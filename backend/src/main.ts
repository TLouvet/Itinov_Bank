import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from './swagger';
import { ResponseLogInterceptor } from './common/interceptors/response-log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .setGlobalPrefix('api/v1')
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new ResponseLogInterceptor())
    .enableCors();

  initSwagger(app);

  await app.listen(4000);
}

bootstrap();
