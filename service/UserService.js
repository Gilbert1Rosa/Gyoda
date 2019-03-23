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
    router.post(path, SearchUser);
    router.patch(path, ModifyUser);
    router.put(path, app.oauth.authorise(), InsertUser);
    router.delete(path, app.oauth.authorise(), DeleteUser);
    return router;
}

/**
 * Middleware for posting a user to be searched.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const SearchUser = (req, res) => {
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
const ModifyUser = (req, res) => {

}

/**
 * Middleware for posting a user to be inserted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertUser = (req, res) => {

}

/**
 * Middleware for posting a user to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteUser = (req, res) => {

}

module.exports = UserService;

/**
 *  Gets the Data provider for the users.
 */
module.exports.getUserDAO = () => {
    return userDAO;
}

