const sm = require('../server_modules');

module.exports = {

  getInitVerses: (req, res) => {
    sm.getInitVerses(req.params)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  },

  getVerse: (req, res) => {
    sm.getVerse(req.params.id, req.params.userId)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  },

  upsert: (req, res) => {
    sm.upsert(req.body, req.params.table)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
  }

}
