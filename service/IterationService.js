const ServiceHandler = require('../util/ServiceHandler');

let path = '/iteration';
let iterationDAO;

/**
 *  The IterationServices function is intended to be a middleware
 *  for managing iterations.
 * 
 * @param {*} app                    Express middleware object.
 * @param {*} router                 Express router
 * @param {*} injectedIterationDAO   Data provider for the iterations.
 */
const IterationService = (app, router, injectedIterationDAO) => {
    iterationDAO = injectedIterationDAO;   
    router.post(path, app.oauth.authorise(), SearchIteration);
    router.patch(path, app.oauth.authorise(), ModifyIteration);
    router.put(path, app.oauth.authorise(), InsertIteration);
    router.delete(path, app.oauth.authorise(), DeleteIteration);
    return router;
}

/**
 * Middleware for posting an iteration to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const SearchIteration = (req, res) => {
    var project = null;
    const serviceHandler = ServiceHandler(req, res);
}

/**
 * Middleware for patching an iteration to be modified.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const ModifyIteration = (req, res) => {

}

/**
 * Middleware for posting an iteration to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertIteration = (req, res) => {
    // TODO: Make project inserting logic here
}

/**
 * Middleware for posting an iteration to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteIteration = (req, res) => {
    // TODO: Make project deleting logic here
}

module.exports = IterationService;

