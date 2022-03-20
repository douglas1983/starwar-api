import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/filters/http-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Star Wars API - Teste FastProBr')
    .setDescription('Api para o teste para desenvolvedor backend na FastProBR')
    .setVersion('1.0')
    .addTag('user', 'API para usuários')
    .addTag('people', 'API para pessoas do star wars ')
    .addTag('auth', 'API para autenticação')
    .addBearerAuth()

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
