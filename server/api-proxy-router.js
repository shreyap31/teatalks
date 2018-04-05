const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const baseUrl = 'http://localhost:9001';

const router = express.Router();

router.use(bodyParser.json());

router.all('*', apiProxyHandler);

function apiProxyHandler(req, res) {
  const options = {
    url: req.path,
    baseUrl,
    method: req.method,
    qs: req.query,
    body: req.body,
    json: true
  };
  request(options, function(error, response, body) {
    if (error) {
      const responseToClient = parseResponseBody(error);
      res.status(500).json(responseToClient);
    } else {
      const responseToClient = parseResponseBody(body);
      res.status(response.statusCode).json(responseToClient);
    }
  });
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