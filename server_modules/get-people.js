const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();

module.exports = (search) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('person').find({})
    .toArray((err, result) => {
      if (err) reject(err);
      let sorted = result.sort(compare);
      let options = sorted.slice(0, 9);
      resolve(options);
    });

  });

});

function compare(a,b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
