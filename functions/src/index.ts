import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import * as admin from 'firebase-admin';
admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('clubs');

exports.indexAnimal = functions.firestore
  .document('clubs/{clubId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    // Add the data to the algolia index
    return index.addObject({
      objectID,
      ...data
    });
});

exports.unindexAnimal = functions.firestore
  .document('clubs/{clublId}')
  .onDelete((snap, context) => {
    const objectId = snap.id;

    // Delete an ID from the index
    return index.deleteObject(objectId);
});


exports.onUserRegistration = functions.firestore
  .document('users/{userID}')
  .onCreate((snap, context) => {

      const user = snap.data();
      user['createdOn'] = new Date();
      return snap.ref.set(user, {merge: true});
  })


