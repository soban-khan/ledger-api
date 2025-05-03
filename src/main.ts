import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './interceptors/http-exceptions.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ENV } from './constants/env.constants';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig, swaggerOptions } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = ENV.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.enableCors({
  //   origin: ['http://localhost:3000'],
  //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  // });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, swaggerOptions);
  await app.listen(port);

  console.log(`Application is running on port: ${port}`);
}
bootstrap();
