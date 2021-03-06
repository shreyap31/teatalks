const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();

router.use(bodyParser.json());

router.post('/teaTalks/signup', signupHandler);

router.post('/teaTalks/login', loginHandler);

router.post('/teaTalks/logout', logoutHandler);

router.all([
  '/teaTalks/addTea',
  '/teaTalks/getTea/:id/:userId',
  '/teaTalks/getTeaList/:userId'
], authHandler, apiProxyHandler);

router.all('*', apiProxyHandler);

function signupHandler(req, res) {
  const options = generateRequestOptions(req);
  request(options, function(error, response, body) {
    if (error) {
      const responseToClient = parseResponseBody(error);
      res.status(500).json(responseToClient);
    } else {
      const responseToClient = parseResponseBody(body);
      if (response.statusCode === 200) {
        // signup successful
        req.session.regenerate(function() {
          res.cookie('TTK_USER', req.body.userId);
          req.session.user = {
            userId: req.body.userId,
            firstName: req.body.firstName,
            lastName: req.body.lastName
          };
          res.status(response.statusCode).json(responseToClient);
        });
      } else {
        // signup failed
        res.status(response.statusCode).json(responseToClient);
      }
    }
  });
}

function loginHandler(req, res) {
  const options = generateRequestOptions(req);
  request(options, function(error, response, body) {
    if (error) {
      const responseToClient = parseResponseBody(error);
      res.status(500).json(responseToClient);
    } else {
      const responseToClient = parseResponseBody(body);
      if (response.statusCode === 200) {
        // login successful
        req.session.regenerate(function() {
          res.cookie('TTK_USER', responseToClient.userId);
          req.session.user = {
            userId: responseToClient.userId,
            firstName: responseToClient.firstName,
            lastName: responseToClient.lastName
          };
          res.status(response.statusCode).json(responseToClient);
        });
      } else {
        // login failed
        res.status(response.statusCode).json(responseToClient);
      }
    }
  });
}

function logoutHandler(req, res) {
  if (req.session.user) {
    req.session.regenerate(function() {
      res.clearCookie('TTK_USER');
      res.status(200).send({ status: 200, message: 'Successfully logged out' });
    });
  }
}

function authHandler(req, res, next) {
  const userCookie = req.cookies['TTK_USER'];
  const user = req.session.user;
  if (user && userCookie !== user.userId) {
    return res.status(401).send({ status: 401, message: 'Unauthorized Request' });
  }
  next();
}

function apiProxyHandler(req, res) {
  const options = generateRequestOptions(req);
  request(options, function(error, response, body) {
    return sendResponseToClient(res, error, response, body);
  });
}

function generateRequestOptions(req) {
  return {
    url: req.path,
    baseUrl: 'http://10.8.6.132:8080',
    method: req.method,
    qs: req.query,
    body: req.body,
    json: true
  };
}

function sendResponseToClient(res, error, response, body) {
  if (error) {
    const responseToClient = parseResponseBody(error);
    res.status(500).json(responseToClient);
  } else {
    const responseToClient = parseResponseBody(body);
    res.status(response.statusCode).json(responseToClient);
  }
}

function parseResponseBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (err) {}
  }
  return body;
}

module.exports = router;