var express = require('express');
const bodyParser = require('body-parser');
const UserService = require('./service/UserService');
const LoginService = require('./service/LoginService');
var app = express();
var router = express.Router;

var logger = (req, res, next) => {
    console.log("Request received");
    next();
};

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', UserService());
app.use('/', LoginService(app));
app.listen(5000);