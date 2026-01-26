import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
const port = process.env.PORT as string;

async function bootstrap() {
  if (!port)
    throw new Error(
      'Please provide a port for this backend by creating .env file like .env.example.',
    );
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
void bootstrap();
