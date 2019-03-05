const express = require('express');
var oauthServer = require('node-oauth2-server');
var OauthModel = require('../data/model/OAuthModel');
var AccessTokenService = require('./AccessTokenService');

module.exports = (app, userService) => {
    var userDAO = userService.getUserDAO();
    app.oauth = new oauthServer({
        model: OauthModel(userDAO, AccessTokenService),
        grants: ['password'],
        debug: true
    });
    app.all('/gyoda/api/oauth', app.oauth.grant());
}