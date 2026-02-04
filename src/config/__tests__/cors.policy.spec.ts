import { determineUrl } from '../cors.policy';

describe('determineUrl', () => {
  it('returns dev frontend url in development', () => {
    const mockEnv = {
      NODE_ENV: 'development',
      DEV_FRONTEND_DOMAIN: 'http://localhost',
      FRONTEND_PORT: '3000',
      PROD_FRONTEND_URL: 'https://statistics.com',
    };

    const result = determineUrl(mockEnv);

    expect(result).toBe('http://localhost:3000');
  });

  it('returns prod frontend url in production', () => {
    const mockEnv = {
      NODE_ENV: 'production',
      PROD_FRONTEND_URL: 'https://statistics.com',
      DEV_FRONTEND_DOMAIN: 'http://localhost',
      FRONTEND_PORT: '3000',
    };

    const result = determineUrl(mockEnv);

    expect(result).toBe('https://statistics.com');
  });

  it('throws error when dev variables missing', () => {
    const mockEnv = {
      NODE_ENV: 'development',
    };

    expect(() => determineUrl(mockEnv)).toThrow(
      'Missing DEV frontend environment variables',
    );
  });

  it('throws error when prod url missing', () => {
    const mockEnv = {
      NODE_ENV: 'production',
    };

    expect(() => determineUrl(mockEnv)).toThrow('Missing PROD_FRONTEND_URL');
  });

  it('throws error when NODE_ENV invalid', () => {
    const mockEnv = {
      NODE_ENV: 'test',
    };

    expect(() => determineUrl(mockEnv)).toThrow('Cannot identify NODE_ENV');
  });
});
