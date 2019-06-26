var express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

/* DAOs */
const MockIterationDAO = require('./src/data/mock-dao/MockIterationDAO');
const MockUserDAO = require('./src/data/mock-dao/MockUserDAO');

/* Services */
const AuthService = require('./src/service/AuthService');
const IterationService = require('./src/service/IterationService');
const UserService = require('./src/service/UserService');

const SessionManager = require('./src/util/SessionManager');

/* Configurations */
var app = express();
var router = express.Router();

var userDAO = new MockUserDAO();
var iterationDAO = new MockIterationDAO();

var logger = (req, res, next) => {
    console.log(`Request received: ${req.path}`);
    next();
};

var authService = AuthService(router, userDAO);

app.use(cors({
    origin : [
        "http://localhost:4200",
        "http://0.0.0.0:4200"
    ],
    credentials: true
}));
SessionManager(app, userDAO); // This should go first
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var userService = UserService(app, router, userDAO, authService);
var iterationService = IterationService(app, router, iterationDAO);

app.use('/gyoda/api', userService);
app.use('/gyoda/api', iterationService);
app.use('/gyoda/api', authService.routes);
app.listen(5000);