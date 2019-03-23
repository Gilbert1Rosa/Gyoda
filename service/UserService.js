const ServiceHandler = require('../util/ServiceHandler');

let userDAO;

/**
 *  The UserService function is intended to be a middleware
 *  for managing users.
 * 
 *  @param {*}       app              Express middleware object.
 *  @param {*}       router           Express router
 *  @param {UserDAO} injectedUserDAO  Data provider for the users.
 */
const UserService = (app, router, injectedUserDAO) => {
    userDAO = injectedUserDAO;
    router.post('/user', app.oauth.authorise(), (req, res) => {
        const serviceHandler = ServiceHandler(req, res);
        var id = null;
        if (req.body) {
            id = req.body.id;
        }
        if (id) {
            userDAO.getUserById(id, serviceHandler);
        } else {
            userDAO.getUsers(serviceHandler);
        }
    });
    router.put('/user', app.oauth.authorise(), (req, res) => {

    });
    router.delete('/user', app.oauth.authorise(), (req, res) => {

    });
    return router;
}

module.exports = UserService;

/**
 *  Gets the Data provider for the users.
 */
module.exports.getUserDAO = () => {
    return userDAO;
}

