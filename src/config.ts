import dotenv from 'dotenv';

dotenv.config();

const MANDATORY_ENVS = [
  'OPENAI_API_KEY'
];

for (const env of MANDATORY_ENVS) {
  if (!process.env[env]) {
    throw new Error(`Missing env ${env}`);
  }
}

export const PORT = process.env.PORT || 3000;
export const OPENAI_API_HOST = 'https://api.openai.com';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
export const OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID;

export const WHITELIST_API_ENDPOINTS = [
  '/',
  '/v1/models',
  '/v1/chat/completions'
];