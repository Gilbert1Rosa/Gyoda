var express = require('express')
const bodyParser = require('body-parser');

/* DAOs */
const MockIterationDAO = require('./data/mock-dao/MockIterationDAO');
const MockUserDAO = require('./data/mock-dao/MockUserDAO');

/* Services */
const AuthService = require('./service/AuthService');
const IterationService = require('./service/IterationService');
const UserService = require('./service/UserService');

/* Configurations */
var app = express();
var router = express.Router();

var userDAO = new MockUserDAO();
var iterationDAO = new MockIterationDAO();

var logger = (req, res, next) => {
    console.log("Request received");
    next();
};

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
AuthService(app, userDAO);

var userService = UserService(app, router, userDAO);
var iterationService = IterationService(app, router, iterationDAO);

app.use('/gyoda/api', userService);
app.use('/gyoda/api', iterationService);
app.listen(5000);