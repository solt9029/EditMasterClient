const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/Scores/index', (req, res) => {
  res.redirect('/');
});

app.get('/Scores/help', (req, res) => {
  res.redirect('/help');
});

app.get('/Scores/view', (req, res) => {
  res.redirect('/scores');
});

app.get('/Scores/edit', (req, res) => {
  if (req.query.id) {
    res.redirect(`/scores/${req.query.id}`);
  }
  res.redirect('/scores/new');
});

app
  .get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .listen(80);
