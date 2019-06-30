var express = require('express')
const bodyParser = require('body-parser');
const Process = require('process');

/* DAOs */
const MockIterationDAO = require('./src/data/mock-dao/MockIterationDAO');
const MockUserDAO = require('./src/data/mock-dao/MockUserDAO');
const UserDAO = require('./src/data/dao/UserDAO');

/* Services */
const AuthService = require('./src/service/AuthService');
const IterationService = require('./src/service/IterationService');
const UserService = require('./src/service/UserService');

/* Util */
const SessionManager = require('./src/util/SessionManager');
const OracleConnection = require('./src/util/oracle/OracleConnection');
const Mapper = require('./src/util/oracle/OracleMapper');

/* Configurations */
var app = express();
var router = express.Router();

async function initServer() {
    let connection = await OracleConnection.connect({
        user: 'GyodaDba',
        password: 'password',
        connectString: 'localhost/xe'
    });

    //var userDAO = new MockUserDAO();
    var iterationDAO = new MockIterationDAO();
    var userDAO = new UserDAO(connection);

    var logger = (req, res, next) => {
        console.log(`Request received: ${req.path}`);
        next();
    };

    var defaults = (req, res, next) => {
        res.type('json');
        next();
    };

    Process.on('exit', () => {
        console.log('Bye');
        OracleConnection.close();
    });

    var authService = AuthService(router, userDAO);

    SessionManager(app, userDAO); // This should go first
    app.use(logger, defaults);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var userService = UserService(app, router, userDAO, authService);
    var iterationService = IterationService(app, router, iterationDAO);

    app.use('/gyoda/api', userService, iterationService, authService.routes);
    app.listen(5000);
}

initServer();
