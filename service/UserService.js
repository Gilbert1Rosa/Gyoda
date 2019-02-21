const express = require('express');
const basicResponse = require('../util/BasicResponse');
const MockUserDAO = require('../data/mock-dao/MockUserDAO');
const router = express.Router();

module.exports = (app) => {
    router.post('/user', (req, res) => {
        var mockUserDAO = new MockUserDAO();
        var id = null;
        const serviceHandler = (err, data) => {
            var message = "";
            var errorCode = "";
            if (!data || data == [] || err) {
                message = `Data not found, an error happened: ${err}`;
            }
            var response = JSON.stringify(basicResponse(data, message, errorCode))
            res.send(response); 
        };
        if (req.body) {
            id = req.body.id;
        }
        if (id) {
            mockUserDAO.getUserById(id, serviceHandler);
        } else {
            mockUserDAO.getUsers(serviceHandler);
        }
    });
    return router;
}