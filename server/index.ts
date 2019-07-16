// dotenv
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const request = require('request');
const path = require('path');
const app = express();

// basic auth
const toBool = require('to-bool');
if (toBool(process.env.BASIC_AUTH)) {
  const basicAuth = require('basic-auth-connect');
  app.use(basicAuth(process.env.BASIC_USERNAME, process.env.BASIC_PASSWORD));
}

// view settings
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// redirect
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

// serve
app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent.startsWith('Twitterbot') || userAgent.startsWith('Slackbot')) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    return;
  }
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/help', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.sendFile(path.join(__dirname, 'views', 'help.html'));
    return;
  }
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/scores', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.sendFile(path.join(__dirname, 'views', 'scores', 'index.html'));
    return;
  }
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/scores/new', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.sendFile(path.join(__dirname, 'views', 'scores', 'new.html'));
    return;
  }
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.get('/scores/:id', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    request.get(
      {
        url: `http://editmasterapi.solt9029.com/scores/${req.params.id}`
      },
      (response, body) => {
        const score = JSON.parse(body);
        if (score.comment === null) {
          score.comment = '';
        }
        res.render('scores/show', { score: score });
      }
    );
    return;
  }
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

// static
app.use(express.static(path.resolve(__dirname, '../build')));

// all
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));

// listen
const port = process.env.PORT || 80;
app.listen(port);
console.log(`app listening on port ${port}!`);
