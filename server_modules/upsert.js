const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoURI = require('./get-mongo-uri')();

module.exports = (body, table) => new Promise((resolve, reject) => {

  body.refId = ObjectId(body.refId);

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection(table).update({
      userId: body.userId, refId: body.refId
    }, body, {
      upsert: true
    }, (err, result) => {

      err ? reject(err) : resolve(result);

    });

  });

});
