const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoURI = require('./get-mongo-uri')();

module.exports = (id, userId) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('scriptures').find({
      _id: ObjectId(id)
    }, (err, result) => {

      if (err) reject(err);

      result.toArray((err, result) => {

        if (err) reject(err);

        db.collection('additions').find({
          refId: ObjectId(id), userId: userId
        }).toArray((err, additions) => {

          if (err) reject(err);

          if (additions.length > 0) {
            resolve(Object.assign({}, additions[0], result[0]))
          }

          resolve(result[0]);
          
        });

      });

    });

  });

});
