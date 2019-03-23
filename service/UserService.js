const ServiceHandler = require('../util/ServiceHandler');

let path = '/user';
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
    router.post(path, searchUser);
    router.patch(path, modifyUser);
    router.put(path, app.oauth.authorise(), insertUser);
    router.delete(path, app.oauth.authorise(), deleteUser);
    return router;
}

/**
 * Middleware for posting a user to be searched.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const searchUser = (req, res) => {
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
}

/**
 * Middleware for patching a user to be modified.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const modifyUser = (req, res) => {

}

/**
 * Middleware for posting a user to be inserted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const insertUser = (req, res) => {

}

/**
 * Middleware for posting a user to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const deleteUser = (req, res) => {

}

module.exports = UserService;

/**
 *  Gets the Data provider for the users.
 */
module.exports.getUserDAO = () => {
    return userDAO;
}

