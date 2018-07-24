const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const mongoURI = require('./get-mongo-uri')();

module.exports = (body, table) => new Promise((resolve, reject) => {

  try {

    let refId = ObjectId(body.refId);
    let userId = body.userId;
    let id = body._id ? ObjectId(body._id) : null;
    let dontSaveToScripture = body.dontSaveToScripture;

    delete body.refId;
    delete body.userId;
    delete body._id;
    delete body.type;

    if (table === 'link') {
      delete body.reference;
      delete body.content;
    }

    if (table === 'military' || table === 'prophet' || table === 'ruler') {
      body.personId = ObjectId(body.personId);
    }

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
        let response = {};
        db.collection(table).insert(body, (err, result) => {
          if (err) reject(err);
          if (result.ops[0]._id) {
            response._id = result.ops[0]._id;
            if (!dontSaveToScripture) {
              db.collection('map').insert({
                refId: refId,
                userId: userId,
                table: table,
                tableId: result.ops[0]._id
              }, (err, result) => {
                if (err) reject(err);
                response.mapId = result.ops[0]._id;
                resolve(response);
              });
            } else {
              resolve(response);
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
