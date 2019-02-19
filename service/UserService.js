const express = require('express');
const basicResponse = require('../util/BasicResponse');
const MockUserService = require('../data/mock-dao/MockUserDAO');
const router = express.Router();

module.exports = (app) => {
    router.get('/user', (req, res) => {
        var mockUserService = new MockUserService();
        mockUserService.getUserById("0011", (err, data) => {
            var message = "";
            var errorCode = "";
            if (!err) {
                console.log(data);
                var response = JSON.stringify(basicResponse(JSON.stringify(data), message, errorCode))
                res.send(response);
            }
        });
        
    });
    return router;
}