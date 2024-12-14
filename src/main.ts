import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://127.0.0.1:5500', // Frontend URL
    credentials: true,  // Allow cookies to be sent
  });

  await app.listen(3003);  // Make sure your app is listening on the correct port
}

bootstrap();
