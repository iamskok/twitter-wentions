import dotenv from 'dotenv';
import fs from 'fs';
import logger from '../services/logger';
import ENV_PATH from '../constants/env-path';

if (fs.existsSync(ENV_PATH)) {
  logger.log('info', '`.env` was found.');
} else {
  logger.log('warn', '`.env` is not found.');
}

export default dotenv.config({ path: ENV_PATH });
