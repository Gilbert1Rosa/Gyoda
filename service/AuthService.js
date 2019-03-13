const express = require('express');
var OAuthModel = require('../data/model/OAuthModel');
var oauthServer = require('node-oauth2-server');
var AccessTokenService = require('./AccessTokenService');

/**
 *  The AuthService manages the authentication for the web service.
 * 
 *  @param {*}        app              Express middleware object.
 *  @param {UserDAO}  injectedUserDAO  Data provider for the users.
 */
module.exports = (app, injectedUserDAO) => {
    var userDAO = injectedUserDAO;
    app.oauth = new oauthServer({
        model: OAuthModel(userDAO, AccessTokenService),
        grants: ['password'],
        debug: true
    });
    app.all('/gyoda/api/oauth', app.oauth.grant());
}