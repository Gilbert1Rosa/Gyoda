const CheckUtil = require('../util/CheckUtil');
const BasicResponse = require('../util/BasicResponse');
const ERROR_CODES = require('../error/ErrorCodes');
const ServiceHandler = require('../util/ServiceHandler');
const JWT = require('jsonwebtoken');

let middleware = (req, res, next) => {
    next();
}

let createToken = (req, res, data) => {
    let tokenData = {name: data[0].name, password: data[0].password};
    token = JWT.sign(tokenData, 'secret', {
        expiresIn: 30 * 60
    });
    return token;
}

/**
 *  The AuthService manages the authentication for the web service.
 * 
 *  @param {*}        app              Express middleware object.
 *  @param {UserDAO}  injectedUserDAO  Data provider for the users.
 */
module.exports = (router, injectedUserDAO) => {
    var userDAO = injectedUserDAO;

    router.post('/login', (req, res) => {
        let hasAllParams = CheckUtil.checkProperties(req.body, ['user', 'password']);
        let data = null;
        if (hasAllParams) {
            userDAO.getUserByCredentials(req.body.user, req.body.password, (err, data) => {
                let token = null;
                if (!err) {
                    token = createToken(req, res, data);
                    req.session.tokenData = token;
                }
                ServiceHandler(req, res)(err, token);
            });
        } else {
            res.send(JSON.stringify(BasicResponse(data, 'Login failed', ERROR_CODES.LOGIN_FAILED, false)));
        }
    });
    router.post('/logout', (req, res) => {
        console.log("Enter to logout");
    });

    return {
        middleware: middleware,
        routes: router
    };
}

