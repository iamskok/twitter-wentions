import twitAppAuth from '../../services/twit-app-auth.js';
import getPostTitle from '../../utils/get-post-title.js';
import logger from '../../services/logger.js';

// Find tweets mentioning `domainName` via `search/tweets` endpoint.
const readSearchTweets = (domainName, setTweet) => {
  logger.log('info', '>>>> Enter readSearchTweets');

  twitAppAuth.get(
    'search/tweets',
    {
      q: `url:${domainName}`,
      count: 100,
    },
    (error, data, response) => {
      logger.log('debug', 'Call twitAppAuth.get() with', {
        endpoint: 'search/tweets',
        options: {
          q: `url:${domainName}`,
          count: 100,
        },
      });

      if (error) {
        // Handle "Rate limit exceeded." error. Error code 88.
        if (error.message.toLowerCase().includes('rate limit exceeded')) {
          logger.log('info', 'Twitter API returned `Rate limit exceeded` error');
          logger.log('verbose', 'Wait for 15mins before calling readSearchTweets()');

          setTimeout(async () => {
            logger.log('verbose', 'Call searchTweetResponses() again after 15mins wait');

            readSearchTweets(domainName, setTweet);
          }, 15 * 60 * 1000);
        } else {
          logger.log('error', 'Error in readSearchTweets => twitUserAuth.get()', {
            endpoint: 'search/tweets',
            options: {
              q: `url:${domainName}`,
              count: 100,
            },
          },
          error);

          throw new Error(error);
        }
      } else if (response.statusCode === 200) {
        logger.log('debug', 'Twitter API returned status code 200');

        data.statuses.forEach((tweet) => {
          tweet.entities.urls.forEach(async ({ expanded_url: url }) => {
            if (url.includes(domainName)) {
              logger.log('debug', `Tweet includes ${domainName} URL`);

              const postTitle = getPostTitle(url);

              logger.log('debug', `Tweet relates to ${postTitle} blog post`);

              if (postTitle) {
                await setTweet(postTitle, tweet);

                logger.log('debug', `Add tweet to ${postTitle} document`);
              }
            }
          });
        });
      }
    },
  );

  logger.log('info', '>>>> Exit readSearchTweets');
};

export default readSearchTweets;
