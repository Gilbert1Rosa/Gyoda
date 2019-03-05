var express = require('express')
const bodyParser = require('body-parser');

/* DAO */
const MockUserDAO = require('./data/mock-dao/MockUserDAO');

/* Service */
const UserService = require('./service/UserService');
const AuthService = require('./service/AuthService');

/* Configuration */
var app = express();
var router = express.Router();

var userDAO = new MockUserDAO();

var logger = (req, res, next) => {
    console.log("Request received");
    next();
};

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
AuthService(app, userDAO);

var userService = UserService(app, router, userDAO);

app.use('/gyoda/api', userService);
app.listen(5000);