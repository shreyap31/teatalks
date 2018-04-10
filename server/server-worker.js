const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const apiProxyRouter = require('./api-proxy-router');

const port = process.env.port || 8081;

const app = express();

const buildAbsolutePath = path.resolve(__dirname, '../dist');

const expressSession = require('express-session');

// For populating cookies into req object
app.use(cookieParser());

// For handling app session
app.use(expressSession({
  secret: 'pe$dfs^2bhsHyu*93emc@as%989cmGv!#09qsxS%ascklY67',
  resave: false,
  saveUninitialized: false
}));

// For serving static assets (js, css, etc)
app.use(express.static(buildAbsolutePath));

// For relaying api requests from client to actual API endpoint
app.use('/api', apiProxyRouter);

// For any other requests including root path '/', send the index html
app.get('*', function(req, res) {
  res.sendFile(path.join(buildAbsolutePath, 'index.html'));
});

app.listen(port, function(err) {
  console.log('Server listening on port ' + port);
});