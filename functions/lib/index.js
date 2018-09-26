"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();
const env = functions.config();
const algoliasearch = require("algoliasearch");
// Initialize the Algolia Client
const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('clubs');
exports.indexAnimal = functions.firestore
    .document('clubs/{clubId}')
    .onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;
    // Add the data to the algolia index
    return index.addObject(Object.assign({ objectID }, data));
});
exports.unindexAnimal = functions.firestore
    .document('clubs/{clublId}')
    .onDelete((snap, context) => {
    const objectId = snap.id;
    // Delete an ID from the index
    return index.deleteObject(objectId);
});
//# sourceMappingURL=index.js.map