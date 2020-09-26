import Twit from 'twit';
// eslint-disable-next-line no-unused-vars
import dotenvConfig from '../config/dotenv.js';
import TIMEOUT from '../constants/twit.js';

const {
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} = process.env;

// Used for `search/*` endpoints.
const twitUserAuth = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token: TWITTER_ACCESS_TOKEN,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: TIMEOUT,
});

export default twitUserAuth;