const express = require('express');
const router = express.Router();

module.exports = (app) => {
    router.get('/login', (req, res) => {
        var message = "This is the login";
        res.send(`{"message":"${message}"}`);
    });
    return router;
}