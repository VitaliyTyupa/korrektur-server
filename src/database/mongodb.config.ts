import { registerAs } from '@nestjs/config';

function normalizeMongoUri(uri: string): string {
  return uri.endsWith(';') ? uri.slice(0, -1) : uri;
}

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export default registerAs('mongodb', () => ({
  uri: normalizeMongoUri(requireEnv('MONGODB_URI')),
}));
