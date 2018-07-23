const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();
const getVerse = require('./get-verse');

module.exports = (params) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    let initSearch = {
      workFul: params.work, bookFul: params.book,
      chapter: Number(params.chap), verse: Number(params.vers)
    };

    let curVerse, prevVerse, nextVerse;

    getVerse(params.userId, initSearch)
    .then((verse) => curVerse = verse)
    .then(() => getVerse(params.userId, { _id: curVerse.prevId }))
    .then((verse) => prevVerse = verse)
    .then(() => getVerse(params.userId, { _id: curVerse.nextId }))
    .then((verse) => nextVerse = verse)
    .then(() => resolve([prevVerse, curVerse, nextVerse]))
    .then((err) => reject(err));

  });

});
