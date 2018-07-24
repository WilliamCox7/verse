// packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ss = require('./server_services/scripture-service');

// express setup
const app = module.exports = express();
app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));

// routes
app.get('/verses/:work/:book/:chap/:vers/:userId', ss.getInitVerses);
app.get('/verse/:work/:book/:chap/:vers/:userId', ss.getVerseByReference);
app.get('/verse/:id/:userId', ss.getVerse);
app.get('/people/:search', ss.getPeople);
app.post('/upsert/:table', ss.upsert);
app.delete('/item/:id', ss.deleteItem);

// wildcard route - allows for browser refresh while using react router
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'))
});

// express app is running - success message
app.listen(app.get('port'), () => {
  console.log('localhost:' + app.get('port'));
});
