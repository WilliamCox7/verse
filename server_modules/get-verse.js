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
  .then((tableItems) => addItemTypeToAllTableItems(tableItems, item.table))
  .then((tableItems) => tableItems.entries())
  .then((tableItemsIter) => iterate(tableItemsIter, getScriptureContentsForItem, db, []))
  .then((processed) => processed.forEach((p) => items.push(p)))
  .then(() => iterate(iter, processItemFromMap, db, items))
  .catch((err) => Promise.reject(err));
}

function addItemTypeToAllTableItems(tableItems, table) {
  return tableItems.map((tableItem) => {
    tableItem.type = table;
    return tableItem;
  });
}

function getScriptureContentsForItem(iter, item, db, items) {
  if (item.type !== 'link') {
    items.push(item);
    return iterate(iter, getScriptureContentsForItem, db, items);
  } else {
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
  }
}
