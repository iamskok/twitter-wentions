import Twit from 'twit';
// eslint-disable-next-line no-unused-vars
import dotenvConfig from '../config/dotenv.js';
import timeout from '../constants/twit.js';

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET,
} = process.env;

// Used for `search/tweets` endpoint for a greater request limit.
const twitAppAuth = new Twit({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  timeout_ms: timeout,
  app_only_auth: true,
});

export default twitAppAuth;
