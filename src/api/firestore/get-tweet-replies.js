import db from './db';
import logger from '../../services/logger';
import firestoreUrl from '../../utils/firestore-url';

const getTweetReplies = async (postTitle, tweetId) => {
  logger.log('info', '>>>> Enter `firebase/getTweetReplies`');

  try {
    const docRef = db.doc(`posts/${postTitle}`);

    const replies = (
      await docRef.collection('tweets').doc(tweetId).get()
    ).data().replies || [];

    logger.log('debug', '`firebase/getTweetReplies` replies', {
      tweetId,
      replies,
    });
    logger.log('verbose', `Get tweet replies from firebase ${firestoreUrl({ postTitle, tweetId })}`);
    logger.log('info', '>>>> Exit `firebase/getTweetReplies`');

    return replies;
  } catch (error) {
    logger.log('error', '`firebase/getTweetReplies` catch block', {
      postTitle,
      tweetId,
    },
    {
      error,
    });
  }

  return [];
};

export default getTweetReplies;
