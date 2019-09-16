var express = require('express')
const bodyParser = require('body-parser');
const Process = require('process');

/* DAOs */
//const MockIterationDAO = require('./src/data/mock-dao/MockIterationDAO');
//const MockUserDAO = require('./src/data/mock-dao/MockUserDAO');
const UserDAO = require('./src/data/dao/UserDAO');
const ProjectDAO = require('./src/data/dao/projectDAO');
const IterationDAO = require('./src/data/dao/IterationDAO');
const TaskDAO = require('./src/data/dao/TaskDAO');

/* Services */
const AuthService = require('./src/service/AuthService');
const IterationService = require('./src/service/IterationService');
const UserService = require('./src/service/UserService');
const ProjectService = require('./src/service/ProjectService');
const TaskService = require('./src/service/TaskService');

/* Util */
const SessionManager = require('./src/util/SessionManager');
const OracleConnection = require('./src/util/oracle/OracleConnection');

/* Configurations */
var app = express();
var router = express.Router();

async function initServer() {
    let connection = await OracleConnection.connect({
        user: 'GyodaDba',
        password: 'password',
        connectString: 'localhost:1521/orcl'
        //connectString: 'gyodadb.cb277e4k1thw.us-east-2.rds.amazonaws.com:1521/orcl'
    });

    var iterationDAO = new IterationDAO(connection);
    var userDAO = new UserDAO(connection);
    var projectDAO = new ProjectDAO(connection);
    var taskDAO = new TaskDAO(connection);


    var logger = (req, res, next) => {
        console.log(`Request received: ${req.path}`);
        next();
    };

    var defaults = (req, res, next) => {
        res.type('json');
        next();
    };

    var exitAction = () => {
        console.log('Bye');
        OracleConnection.close();        
    }

    Process.on('exit', exitAction);

    var authService = AuthService(router, userDAO);

    SessionManager(app, userDAO); // This should go first
    app.use(logger, defaults);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    var userService = UserService(app, router, userDAO, authService);
    var iterationService = IterationService(app, router, iterationDAO);
    var projectService = ProjectService(app, router, projectDAO);
    var taskService = TaskService(app, router, taskDAO);

    app.use('/gyoda/api', userService, iterationService, projectService, taskService, authService.routes);
    app.listen(5000);
}

initServer();
