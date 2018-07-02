const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoURI = require('./get-mongo-uri')();

module.exports = (body, table) => new Promise((resolve, reject) => {

  try {

    let refId = ObjectId(body.refId);
    let userId = body.userId;
    let id = body.id ? ObjectId(body.id) : null;
    let dontSaveToScripture = body.dontSaveToScripture;
    delete body.refId;
    delete body.userId;
    delete body.id;

    mongoClient.connect(mongoURI, (err, db) => {

      if (id) {
        db.collection(table).update({
          _id: id
        }, body, {
          upsert: true
        }, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      } else {
        db.collection(table).insert(body, (err, result) => {
          if (err) reject(err);
          if (result.ops[0]._id) {
            let insert = result;
            if (!dontSaveToScripture) {
              db.collection('map').insert({
                refId: refId,
                userId: userId,
                table: table,
                tableId: result.ops[0]._id
              }, (err, result) => {
                if (err) reject(err);
                resolve(insert);
              });
            } else {
              resolve(insert);
            }
          } else {
            resolve(result);
          }
        });
      }

    });

  } catch(err) {
    console.log(err);
    reject(err);
  }

});
