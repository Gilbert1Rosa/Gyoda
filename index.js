var express = require('express'),
    oauthServer = require('node-oauth2-server');
const bodyParser = require('body-parser');
const UserService = require('./service/UserService');
const LoginService = require('./service/LoginService');
var app = express();
var router = express.Router();

var logger = (req, res, next) => {
    console.log("Request received");
    next();
};

app.oauth = new oauthServer({
    model: {},
    grants: ['password'],
    debug: true
});

app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.all('/gyoda/api/oauth', app.oauth.grant());


app.use('/gyoda/api', LoginService(app));
app.use('/gyoda/api', UserService(router));
app.listen(5000);