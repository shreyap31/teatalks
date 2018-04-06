const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const router = express.Router();

router.use(bodyParser.json());

router.post('/teaTalks/login', loginHandler);

router.all('*', apiProxyHandler);

function loginHandler(req, res) {
  const options = generateRequestOptions(req);
  request(options, function(error, response, body) {
    if (error) {
      const responseToClient = parseResponseBody(error);
      res.status(500).json(responseToClient);
    } else {
      const responseToClient = parseResponseBody(body);
      res.cookie('TTK_USER', responseToClient.firstName + ' ' + responseToClient.lastName)
      res.status(response.statusCode).json(responseToClient);
    }
  });
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
    baseUrl: 'http://10.8.6.204:8080',
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