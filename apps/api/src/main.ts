import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // This ensures that any extra properties sent in the request body are stripped out.
      whitelist: true,

      // This will throw an error if extra properties are sent, making it even stricter.
      forbidNonWhitelisted: true,

      // This will automatically transform the incoming payload to an instance of our DTO class.
      transform: true,
      transformOptions: {
        // This allows class-validator to work with primitive types
        // transformed from the network payload. It's crucial for validation.
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
