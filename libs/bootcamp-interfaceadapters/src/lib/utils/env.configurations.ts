import * as path from 'path';
import { EnvConfigurations } from '@btcp/bootcamp-entities';
require('dotenv').config({ path: path.resolve(process.cwd(), 'apps/bootcamp-api/.env') });

export const envConfigurations = {
  JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION),
  JWT_SECRET: process.env.JWT_SECRET 
} as EnvConfigurations;
