const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();

module.exports = (params) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('scriptures').find({
      workFul: params.work, bookFul: params.book,
      chapter: Number(params.chap), verse: Number(params.vers)
    }, (err, result) => {

      if (err) reject(err);

      result.toArray((err, result) => err
        ? reject(err)
        : (
          Promise.all([
            db.collection('scriptures').find({ _id: result[0].prevId }).toArray(),
            db.collection('scriptures').find({ _id: result[0].nextId }).toArray()
          ]).then((surrounding) => {
            Promise.all([
              db.collection('additions').find({ refId: surrounding[0][0]._id, userId: params.userId }).toArray(),
              db.collection('additions').find({ refId: result[0]._id, userId: params.userId }).toArray(),
              db.collection('additions').find({ refId: surrounding[1][0]._id, userId: params.userId }).toArray()
            ]).then((additions) => {
              additions.forEach((addition) => {
                if (addition.length > 0) {
                  delete addition[0]._id;
                  delete addition[0].refId;
                  delete addition[0].userId;
                }
              });
              let prevVerse = Object.assign({}, additions[0][0], surrounding[0][0]);
              let curVerse = Object.assign({}, additions[1][0], result[0]);
              let nextVerse = Object.assign({}, additions[2][0], surrounding[1][0]);
              resolve([prevVerse, curVerse, nextVerse]);
            }).catch((err) => {
              reject(err);
            });
          }).catch((err) => {
            reject(err);
          })
        )
      );

    });

  });

});
