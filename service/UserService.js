const basicResponse = require('../util/BasicResponse');

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
        var id = null;
        const serviceHandler = (err, data) => {
            var message = "";
            var errorCode = "";
            if (!data || data == [] || err) {
                message = `Data not found, an error happened: ${err}`;
            }
            var response = JSON.stringify(basicResponse(data, message, errorCode))
            res.send(response); 
        };
        if (req.body) {
            id = req.body.id;
        }
        if (id) {
            userDAO.getUserById(id, serviceHandler);
        } else {
            userDAO.getUsers(serviceHandler);
        }
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

