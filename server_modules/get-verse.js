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

        db.collection('map').find({
          refId: ObjectId(id), userId: userId
        }).toArray((err, map) => {

          if (err) reject(err);

          let promises = [];
          map.forEach((item) => {
            promises.push(db.collection(item.table).find({ _id: item.tableId }).toArray())
          });

          Promise.all(promises)
          .then((items) => resolve(Object.assign({}, {items: items[0]}, result[0])))
          .catch((err) => {
            console.log(err);
            reject(err);
          })

        });

      });

    });

  });

});
