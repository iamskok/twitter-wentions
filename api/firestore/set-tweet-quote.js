import admin from 'firebase-admin';
import db from './db.js';
import logger from '../../services/logger.js';

const setTweetQuote = async (postTitle, quote) => {
  logger.log('info', '>>>> Enter `firebase/setTweetQuote`');

  try {
    const docRef = await db.doc(`posts/${postTitle}`);

    return docRef.collection('tweets')
      .doc(quote.quoted_status.id_str)
      .set(
        {
          quotes: admin.firestore.FieldValue.arrayUnion(quote),
        },
        {
          merge: true,
        },
      ).then(() => {
        logger.log('info', '>>>> Exit `firebase/setTweetQuote`');
      });
  } catch (error) {
    logger.log('error', '`firebase/setTweetQuote`', {
      postTitle,
      quote,
    },
    {
      errorObject: error,
    });

    throw new Error('`firebase/setTweetQuote`', error);
  }
};

export default setTweetQuote;