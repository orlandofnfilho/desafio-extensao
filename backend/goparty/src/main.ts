import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('GoParty API')
    .setDescription('API Desafio extensão Angular + NodeJs GFT Start #4')
    .setContact(
      'José Orlando Ferreira',
      'https://git.gft.com/jofh',
      'jose-orlando.filho@gft.com',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new DatabaseInterceptor());

  app.enableCors({
    allowedHeaders: '*',

    origin: '*',
  });

  await app.listen(3000);
}
bootstrap();
