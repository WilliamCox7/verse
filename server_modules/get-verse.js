const mongoClient = require('mongodb').MongoClient;
const mongoURI = require('./get-mongo-uri')();

module.exports = (userId, search) => new Promise((resolve, reject) => {

  mongoClient.connect(mongoURI, (err, db) => {

    db.collection('scriptures').find(search)
    .toArray((err, result) => {
      if (err) reject(err);

      let verse = result[0];

      db.collection('map').find({ refId: verse._id, userId: userId })
      .toArray((err, map) => {

        if (err) reject(err);

        let mapIter = map.entries();
        iterate(mapIter, processItemFromMap, db, [])
        .then((items) => resolve(Object.assign({}, {items: items}, verse)));

      });

    });

  });

});

function iterate(iter, cb, db, items) {
  let iteration = iter.next();
  if (iteration.done) return Promise.resolve(items);
  let item = iteration.value[1];
  return cb(iter, item, db, items);
}

function processItemFromMap(iter, item, db, items) {
  return db.collection(item.table).find({ _id: item.tableId }).toArray()
  .then((tableItems) => addItemTypeToAllTableItems(tableItems, item.table, item._id))
  .then((tableItems) => tableItems.entries())
  .then((tableItemsIter) => iterate(tableItemsIter, getScriptureContentsForItem, db, []))
  .then((processed) => processed.forEach((p) => items.push(p)))
  .then(() => iterate(iter, processItemFromMap, db, items))
  .catch((err) => Promise.reject(err));
}

function addItemTypeToAllTableItems(tableItems, table, mapId) {
  return tableItems.map((tableItem) => {
    tableItem.type = table;
    tableItem.mapId = mapId;
    return tableItem;
  });
}

function getScriptureContentsForItem(iter, item, db, items) {
  if (item.type === 'link') {
    let search = {
      workFul: item.work, bookFul: item.book,
      chapter: Number(item.chap), verse: Number(item.vers)
    };
    return db.collection('scriptures').find(search).toArray()
    .then((verse) => {
      item.content = verse[0].content;
      item.reference = `${verse[0].bookAbr} ${verse[0].chapter}:${verse[0].verse}`;
      items.push(item);
      return iterate(iter, getScriptureContentsForItem, db, items);
    });
  } else if (item.type === 'military' || item.type === 'prophet' || item.type === 'ruler') {
    return db.collection('person').find({ _id: item.personId }).toArray()
    .then((person) => {
      item = Object.assign({}, person[0], item);
      items.push(item);
      return iterate(iter, getScriptureContentsForItem, db, items);
    });
  } else if (item.type === 'person') {
    let promises = [];
    if (item.mother) {
      promises.push(
        db.collection('person').find({ _id: item.mother }).toArray()
        .then((person) => item.mother = person)
      );
    }
    if (item.father) {
      promises.push(
        db.collection('person').find({ _id: item.father }).toArray()
        .then((person) => item.father = person)
      );
    }
    if (item.children.length) {
      item.children.forEach((child, i) => {
        promises.push(
          db.collection('person').find({ _id: child }).toArray()
          .then((person) => item.children[i] = person[0])
        );
      });
    }
    if (item.wives.length) {
      item.wives.forEach((wife, i) => {
        promises.push(
          db.collection('person').find({ _id: wife }).toArray()
          .then((person) => item.wives[i] = person[0])
        );
      });
    }
    return Promise.all(promises)
    .then(() => {
      items.push(item);
      return iterate(iter, getScriptureContentsForItem, db, items);
    });
  } else {
    items.push(item);
    return iterate(iter, getScriptureContentsForItem, db, items);
  }
}
