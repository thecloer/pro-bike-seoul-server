import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DEFAULT_PORT } from './config/defaultValues';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const crossOriginList =
    process.env.NODE_ENV === 'production'
      ? process.env.CROSS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
      : true;

  app.setGlobalPrefix('api/v1/bike');
  app.enableCors({ origin: crossOriginList });

  // Interceptors
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || DEFAULT_PORT;
  await app.listen(PORT, () =>
    new Logger('bootstrap').log(`Application listening on port ${PORT}`),
  );
}
bootstrap();
