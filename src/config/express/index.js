const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const routes = require('../../routes');
const { port } = require('../env');

app.set('port', port || 3000);

app.use(cors());

app.use(express.json());

Object.keys(routes).forEach((key) => app.use(`/api/v1/${key}`, routes[key]));

app.use('/api/v1/uploads', express.static(path.join(__dirname, '..', '..', '..', 'uploads')))

module.exports = app;
