const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();

module.exports = (params) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('scriptures').find({
      workFul: params.work, bookFul: params.book,
      chapter: Number(params.chap), verse: Number(params.vers)
    }, (err, result) => {

      if (err) reject(err);

      let prevVerse, curVerse, nextVerse;
      let prevPromises = [], curPromises = [], nextPromises = [];

      result.toArray((err, result) => err
        ? reject(err)
        : (
          Promise.all([
            db.collection('scriptures').find({ _id: result[0].prevId }).toArray(),
            db.collection('scriptures').find({ _id: result[0].nextId }).toArray()
          ])
          .then((surrounding) => {
            prevVerse = surrounding[0];
            curVerse = result;
            nextVerse = surrounding[1];
            return Promise.all([
              db.collection('map').find({ refId: prevVerse[0]._id, userId: params.userId }).toArray(),
              db.collection('map').find({ refId: curVerse[0]._id, userId: params.userId }).toArray(),
              db.collection('map').find({ refId: nextVerse[0]._id, userId: params.userId }).toArray()
            ])
          })
          .then((allMaps) => {
            allMaps.forEach((map, i) => {
              map.forEach((item) => {
                if (i === 0) prevPromises.push(db.collection(item.table).find({ _id: item.tableId }).toArray());
                if (i === 1) curPromises.push(db.collection(item.table).find({ _id: item.tableId }).toArray());
                if (i === 2) nextPromises.push(db.collection(item.table).find({ _id: item.tableId }).toArray());
              });
            });
            return Promise.resolve();
          })
          .then(() => Promise.all(prevPromises))
          .then((prevItems) => prevVerse = Object.assign({}, {items: prevItems.reduce((acc, val) => acc.concat(val), [])}, prevVerse[0]))
          .then(() => Promise.all(curPromises))
          .then((curItems) => curVerse = Object.assign({}, {items: curItems.reduce((acc, val) => acc.concat(val), [])}, curVerse[0]))
          .then(() => Promise.all(nextPromises))
          .then((nextItems) => nextVerse = Object.assign({}, {items: nextItems.reduce((acc, val) => acc.concat(val), [])}, nextVerse[0]))
          .then(() => resolve([prevVerse, curVerse, nextVerse]))
          .catch((err) => {
            console.log(err);
            reject(err);
          })
        )
      );

    });

  });

});
