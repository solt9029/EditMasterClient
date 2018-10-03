const express = require('express');
const path = require('path');
const request = require('request');
const app = express();

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
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(metas.index);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/help', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(metas.help);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scores', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(metas.scores.index);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scores/new', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(metas.scores.new);
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scores/:id', (req, res) => {
  if (req.headers['user-agent'].startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    request.get(
      {
        url: `http://${config.api.host}:${config.api.port}/scores/${
          req.params.id
        }`,
      },
      (error, response, body) => {
        const score = JSON.parse(body);
        res.end(metas.scores.show(score));
      }
    );
    return;
  }
  res.sendFile(path.join(__dirname, 'index.html'));
});

// static
app.use(express.static(__dirname));

// all
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(80);

const config = {
  api: {
    host: 'editmasterapi.solt9029.com',
    port: '80',
  },
};

const metas = {
  index: `
  <html>
  <head>
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="創作の達人">
  <meta name="twitter:description" content="誰もが知っている太鼓ゲーム。実は譜面を叩くだけでなく、創作譜面も面白い。創作の達人でオリジナルの譜面を創作しよう。誰でも簡単に始められる、創作譜面支援アプリ。">
  <meta name="twitter:image" content="http://editmaster.solt9029.com/images/twittercard.png">
  <meta name="twitter:url" content="http://editmaster.solt9029.com">
  <meta name="twitter:site" content="@solt9029">
  <meta name="twitter:creator" content="@solt9029">
  </head>
  </html>`,
  help: `
  <html>
  <head>
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="創作の達人">
  <meta name="twitter:description" content="創作の達人のヘルプページです。">
  <meta name="twitter:image" content="http://editmaster.solt9029.com/images/icon.png">
  <meta name="twitter:url" content="http://editmaster.solt9029.com/help">
  <meta name="twitter:site" content="@solt9029">
  <meta name="twitter:creator" content="@solt9029">
  </head>
  </html>`,
  scores: {
    index: `
    <html>
    <head>
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="創作の達人">
    <meta name="twitter:description" content="創作の達人の作品一覧ページです。">
    <meta name="twitter:image" content="http://editmaster.solt9029.com/images/icon.png">
    <meta name="twitter:url" content="http://editmaster.solt9029.com/scores">
    <meta name="twitter:site" content="@solt9029">
    <meta name="twitter:creator" content="@solt9029">
    </head>
    </html>`,
    new: `
    <html>
    <head>
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="創作の達人">
    <meta name="twitter:description" content="創作の達人の創作ページです。">
    <meta name="twitter:image" content="http://editmaster.solt9029.com/images/icon.png">
    <meta name="twitter:url" content="http://editmaster.solt9029.com/scores/new">
    <meta name="twitter:site" content="@solt9029">
    <meta name="twitter:creator" content="@solt9029">
    </head>
    </html>
    `,
    show: score => {
      return `
        <html>
        <head>
        <meta name="twitter:card" content="summary">
        <meta name="twitter:title" content="${
          score.username
        }さんの創作譜面 #創作の達人">
        <meta name="twitter:description" content="${score.comment}">
        <meta name="twitter:image" content="http://i.ytimg.com/vi/${
          score.video_id
        }/mqdefault.jpg">
        <meta name="twitter:url" content="http://editmaster.solt9029.com/scores/${
          score.id
        }">
        <meta name="twitter:site" content="@solt9029">
        <meta name="twitter:creator" content="@solt9029">
        </head>
        </html>
        `;
    },
  },
};
