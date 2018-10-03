const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

app.get('/Scores/index', (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent.startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
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
    </html>`);
    return;
  }
  res.redirect('/');
});

app.get('/Scores/help', (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent.startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
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
    </html>`);
    return;
  }
  res.redirect('/help');
});

app.get('/Scores/view', (req, res) => {
  const userAgent = req.headers['user-agent'];
  if (userAgent.startsWith('Twitterbot')) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
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
    </html>`);
    return;
  }
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
