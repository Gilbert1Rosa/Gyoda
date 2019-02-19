var express = require('express');
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
app.listen(5000);