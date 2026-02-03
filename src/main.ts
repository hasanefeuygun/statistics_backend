import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import 'dotenv/config';
const port = process.env.PORT as string;
const frontendPort = process.env.FRONTEND_PORT;

const logger = new Logger();

async function bootstrap() {
  if (!port || !frontendPort)
    throw new Error(
      'Please check ports are available by looking .env file like .env.example.',
    );
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
void bootstrap().catch((err) => {
  logger.error('Bootstrap failed', err);
  process.exit(1);
});
