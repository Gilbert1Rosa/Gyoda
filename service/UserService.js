const express = require('express');
const basicResponse = require('../util/BasicResponse');
const MockUserDAO = require('../data/mock-dao/MockUserDAO');

let userDAO;

module.exports = (app, router, injectedUserDAO) => {
    userDAO = injectedUserDAO;
    router.post('/user', app.oauth.authorise(), (req, res) => {
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
            userDAO.getUserById(id, serviceHandler);
        } else {
            userDAO.getUsers(serviceHandler);
        }
    });
    return router;
}

module.exports.getUserDAO = () => {
    return userDAO;
}

