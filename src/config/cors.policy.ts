import { WsException } from '@nestjs/websockets';

export type EnvShape = {
  NODE_ENV?: string;
  DEV_FRONTEND_DOMAIN?: string;
  FRONTEND_PORT?: string;
  PROD_FRONTEND_URL?: string;
};

export const determineUrl = (env: EnvShape): string => {
  if (env.NODE_ENV === 'development') {
    if (!env.DEV_FRONTEND_DOMAIN || !env.FRONTEND_PORT) {
      throw new WsException('Missing DEV frontend environment variables');
    }

    return `${env.DEV_FRONTEND_DOMAIN}:${env.FRONTEND_PORT}`;
  }

  if (env.NODE_ENV === 'production') {
    if (!env.PROD_FRONTEND_URL) {
      throw new WsException('Missing PROD_FRONTEND_URL');
    }

    return env.PROD_FRONTEND_URL;
  }

  throw new WsException('Cannot identify NODE_ENV');
};
