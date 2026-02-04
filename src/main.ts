import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import 'dotenv/config';
import { WsException } from '@nestjs/websockets';
const port = process.env.PORT as string;
const frontendPort = process.env.FRONTEND_PORT;

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
void bootstrap().catch((err: unknown) => {
  if (err instanceof Error) {
    throw new WsException(err.message);
  }
  throw new WsException('Unknown error');
});
