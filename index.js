const express = require('express');
const jsonServer = require('json-server');
const Cookies = require('cookies')
const path = require('path');
const api = require('./api');

const port = process.env.PORT || 3000;
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(express.static('client/dist/accounting-system'));
server.get('*', (req, res, next) => {

    if (req.url.includes('users')) {
        if (req.query && req.query.email && req.query.password) {
            next();
            return;
        } else {
            return reject(res);
        }
    }

    if (req.url.includes('bills')) {
        const userId = getUserId(req, res);

        if (req.query && req.query.id && req.query.id === userId) {
            next();
            return;
        } else {
            return reject(res);
        }
    }

    if (checkApi(req.url)) {
        next();
        return;
    }

    redirectToLoginPage(res);
});

server.post('*', (req, res, next) => {
    const userId = getUserId(req, res);

    if (!userId) {
        return reject(res);
    }

    next();
});

server.put('*', (req, res, next) => {
    const userId = getUserId(req, res, next);

    if (!userId) {
        return reject(res);
    }

    next();
});

server.delete('*', (req, res, next) => {
    const userId = getUserId(req, res);

    if (!userId) {
        return reject(res);
    }

    next();
});

server.use(router);
server.use(middlewares);

server.listen(port, () => {
    console.log(`Started on port: ${port}`);
});

function getUserId(req, res) {
    const cookies = new Cookies(req, res);
    return cookies.get('userId');
}

function reject(res) {
    res.sendStatus(401);
    redirectToLoginPage(res);
}

function redirectToLoginPage(res) {
    res.sendFile(
        path.resolve(
            __dirname, 'client', 'dist', 'accounting-system', 'index.html'
        )
    );
}

function checkApi(url) {
    return api.some(item => url.includes(item));
}
