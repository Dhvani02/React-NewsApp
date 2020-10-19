const express = require('express');
const http = require('http');
const app = require('./app');
app.use(express.static('public'));
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
