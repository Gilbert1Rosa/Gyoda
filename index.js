var express = require('express'),
    oauthServer = require('node-oauth2-server');
const UserService = require('./service/UserService');
const LoginService = require('./service/LoginService');
var app = express();
var router = express.Router;

var logger = (req, res, next) => {
    console.log("Request received");
    next();
};

app.use(logger);
app.use('/', UserService());
app.use('/', LoginService(app));
app.get('/', (req, res) => {
    var message = "ASDF";
    res.send(`{"message":"${message}"}`);
});
app.listen(5000);