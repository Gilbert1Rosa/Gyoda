const express = require('express');
const router = express.Router();

module.exports = (app) => {
    router.get('/user', (req, res) => {
        var message = "There's gonna be some users";
        res.send(`{"message":"${message}"}`);
    });
    return router;
}