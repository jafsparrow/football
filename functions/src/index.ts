const functions = require('firebase-functions');
const express = require('express');
const path = require('path');
const { enableProdMode } = require('@angular/core');
const { renderModuleFactory } = require('@angular/platform-server');

const {
  AppServerModuleNgFactory
} = require('../../dist/apps/timeout/server/main');

enableProdMode();

const index = require('fs')
  .readFileSync(
    path.resolve(__dirname, '../../dist/apps/timeout/browser/index.html'),
    'utf8'
  )
  .toString();

let app = express();

app.get('**', function(req, res) {
  renderModuleFactory(AppServerModuleNgFactory, {
    url: req.path,
    document: index
  }).then(html => res.status(200).send(html));
});

exports.ssr = functions.https.onRequest(app);

// cd

// import * as algoliasearch from 'algoliasearch';

// // Initialize the Algolia Client
// const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
// const index = client.initIndex('clubs');

// exports.indexAnimal = functions.firestore
//   .document('clubs/{clubId}')
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     const objectID = snap.id;

//     // Add the data to the algolia index
//     return index.addObject({
//       objectID,
//       ...data
//     });
// });

// exports.unindexAnimal = functions.firestore
//   .document('clubs/{clublId}')
//   .onDelete((snap, context) => {
//     const objectId = snap.id;

//     // Delete an ID from the index
//     return index.deleteObject(objectId);
// });

// exports.onUserRegistration = functions.firestore
//   .document('users/{userID}')
//   .onCreate((snap, context) => {

//       const user = snap.data();
//       user['createdOn'] = new Date();
//       return snap.ref.set(user, {merge: true});
//   })
