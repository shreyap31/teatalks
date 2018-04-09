const express = require('express');
const path = require('path');
const clientSessions = require('client-sessions');
const cookieParser = require('cookie-parser');
const apiProxyRouter = require('./api-proxy-router');

const port = process.env.port || 8081;

const app = express();

const buildAbsolutePath = path.resolve(__dirname, '../dist');

// For populating cookies into req object
app.use(cookieParser());

// For handling app session
app.use(clientSessions({
  cookieName: 'ttk.sid', // sets session cookie name in client browser; keep it vague for security reasons
  requestKey: 'appSession', // sets the property name in request object for accessing session data
  secret: 'pe$dfs^2bhsHyu*93emc@as%989cmGv!#09qsxS%ascklY67',
  duration: 1800000,
  activeDuration: 90000
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