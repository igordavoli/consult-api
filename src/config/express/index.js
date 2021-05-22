const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('../../routes');
const { port } = require('../env');

app.set('port', port || 3000);

app.use(cors());
app.use(express.json());
Object.keys(routes).forEach((key) => app.use(`/api/v1/${key}`, routes[key]));

module.exports = app;
