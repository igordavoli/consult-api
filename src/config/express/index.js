const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('../../routes');
const { port } = require('../env');
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.set('port', port || 3000);

app.use(cors(corsOptions));
app.use(express.json());
Object.keys(routes).forEach((key) => app.use(`/api/v1/${key}`, routes[key]));

module.exports = app;
