const sm = require('../server_modules');
const ObjectId = require('mongodb').ObjectId;

module.exports = {

  getInitVerses: (req, res) => {
    sm.getInitVerses(req.params)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  },

  getVerse: (req, res) => {
    let search = { _id: ObjectId(req.params.id) };
    sm.getVerse(req.params.userId, search)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  },

  getVerseByReference: (req, res) => {
    let search = {
      workFul: req.params.work, bookFul: req.params.book,
      chapter: Number(req.params.chap), verse: Number(req.params.vers)
    };
    sm.getVerse(req.params.userId, search)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  },

  upsert: (req, res) => {
    sm.upsert(req.body, req.params.table)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  }

}
