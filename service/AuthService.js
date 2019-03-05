const express = require('express');
var OAuthModel = require('../data/model/OAuthModel');
var oauthServer = require('node-oauth2-server');
var AccessTokenService = require('./AccessTokenService');

module.exports = (app, injectedUserDAO) => {
    var userDAO = injectedUserDAO;
    app.oauth = new oauthServer({
        model: OAuthModel(userDAO, AccessTokenService),
        grants: ['password'],
        debug: true
    });
    app.all('/gyoda/api/oauth', app.oauth.grant());
}