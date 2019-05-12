const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const api = require('./api');

const port = process.env.PORT || 3000;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(express.static('client/dist/accounting-system'));
server.get('*', (req, res, next) => {
    if (checkApi(req.url)) {
        next();
        return;
    }

    res.sendFile(
        path.resolve(
            __dirname, 'client', 'dist', 'accounting-system', 'index.html'
        )
    );

    function checkApi(url) {
        return api.some(item => url.includes(item));
    }
});

server.use(router);
server.use(middlewares);

server.listen(port, () => {
    console.log(`Started on port: ${port}`);
});
