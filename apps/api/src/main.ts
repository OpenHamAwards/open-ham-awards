import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function registerGlobalPipes(app: INestApplication) {
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
}

export function registerGlobals(app: INestApplication) {
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  registerGlobalPipes(app);
  registerGlobals(app);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
