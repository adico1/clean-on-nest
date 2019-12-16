// import { getHashes } from "crypto";
// import { CreateDeck } from 'src/app/dashboard';

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'bootcampDB';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   signup(db, user);

//   user = getUser(db, email);
//   hashedPassword = hash(password, user.pwSalt);
//   if (user.password !== hashedPassword) {
//     return;
//   }
//   token = generateToken(db, user);

//   deckId = createDeck(db, deck);

//   userDecks = getUserDecks(db, user);

//   deck = getDeckById(deckId);
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();
//   deck.addQuestion();

//   deck.save();

//   user.populateDecks(db);
//   user.decks = getUserDecks(db);

//   user.currentDeckId = 0;

//   practice = new Practice(user.currentDeck);
//   question = pactice.getCurrentQuestion();
//   practice.answerQuestion(answerStatistics, delay, delayLevel)
//   practice.skipQuestion(delay, delayLevel);

//   client.close();
// });

// db.createCollection('users');
// db.createCollection('decks');
// db.createCollection('userDecks');

// ?TBD?
// db.createCollection('roles');
// db.createCollection('categories');

// /** Signup  */
// db.users.insertOne( {
//     firstName: 'Adi',
//     lastName: 'Cohen',
//     email: 'adico1@gmail.com',
//     roles: ['user'],
//     password: 'KC4HTOH98TUQ4HTUCHQ4UHAHCOU4HOAUH4HCOAUH4WOAHGOAEG',
//     hash: '8fn598yoty58ft'
//   });

//   /** Get Password Hash ? */
//   const query = {
//     email: 'adico1@gmail.com'
//   };

//   const projection = {
//     hash: 1
//   };

//   db.users.findOne( query, projection );

//   /** Login? */
//   db.users.findOne( {
//     email: 'adico1@gmail.com',
//     password: 'KC4HTOH98TUQ4HTUCHQ4UHAHCOU4HOAUH4HCOAUH4WOAHGOAEG'
//   } );

// /** Set Token  */
// db.users.findOneAndModify( { _id: ObjectId('MW5C8Y08W548WY857YPW85') }, {
//     token: string;
//     refreshToken?: string;
//   ?
//     aud: string;
//     exp: number;
//     iat: number;
//     iss: string;
//     sub: string;
//   });

// db.users.createIndex( { email: 1 } );

// /** Create Deck */
// db.decks.insertOne({
//     user_id: ObjectId('MW5C8Y08W548WY857YPW85'),
//     version: {
//       major: 0,
//       minor: 0,
//       build: 0
//     },
//     title: 'Angular - The Basics',
//     visibility: ENUM_PRIVATE,
//     groupingCategory: 'Angular',
//     questions: []
//   });

//   /** Add Question To Deck */
//   db.decks.findOneAndModify({ _id: ObjectId('') }, {
//       questions: [
//         {
//           id: string;
//           title: string;
//           content: string;
//         },
//         {
//           id: string;
//           title: string;
//           content: string;
//         },
//       ];
//     });

//     /** Rate Deck */
//     db.decks.insertOne({
//         user_id: ObjectId('MW5C8Y08W548WY857YPW85'),
//         version: {
//           major: 0,
//           minor: 0,
//           build: 0
//         },
//         title: 'Angular - The Basics',
//         visibility: ENUM_PRIVATE,
//         groupingCategory: 'Angular',
//         rating: {
//             rating: 4.9,
//             rates: 4.9,
//             qaCorrectness: 4.9,
//             interesting: 4.9,
//             useful: 4.9,
//             materialLevel: 4.9,
//         },
//         questions: [
//           {
//             id: 1,
//             title: '',
//             content: ''
//           },
//           {
//             id: 2,
//             title: '',
//             content: ''
//           }
//         ]
//       });
