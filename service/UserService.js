const express = require('express');
const basicResponse = require('../util/BasicResponse');
const router = express.Router();

module.exports = (app) => {
    router.get('/user', (req, res) => {
        var data = ""
        var message = ""
        var errorCode = ""
        var response = JSON.stringify(basicResponse(data, message, errorCode))
        res.send(response);
    });
    return router;
}