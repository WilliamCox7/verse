const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();
const ObjectId = require('mongodb').ObjectId;

module.exports = (id) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('map').find({ _id: ObjectId(id) }).toArray()
    .then((item) => {
      let table = item[0].table;
      let tableId = item[0].tableId;
      db.collection('map').remove({ _id: ObjectId(id) }, (err, result) => {
        if (err) reject(err);
        if (table === 'person') {
          resolve();
        } else {
          db.collection(table).remove({ _id: tableId }, (err, result) => {
            if (err) reject(err);
            resolve();
          });
        }
      });
    });

  });

});
