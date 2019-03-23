const ServiceHandler = require('../util/ServiceHandler');

let projectDAO;

/**
 *  The ProjectService function is intended to be a middleware
 *  for managing projects.
 * 
 * @param {*} app                    Express middleware object.
 * @param {*} router                 Express router
 * @param {*} injectedProjectDAO     Data provider for the iterations.
 */
const ProjectService = (app, router, injectedProjectDAO) => {
    projectDAO = injectedProjectDAO;   
    router.post('/project', app.oauth.authorise(), searchProject);
    router.put('/project', app.oauth.authorise(), insertProject);
    router.delete('/project', app.oauth.authorise(), deleteProject);
    return router;
}

/**
 * Middleware for posting an project to be searched.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const searchProject = (req, res) => {
    var project = null;
    const serviceHandler = ServiceHandler(req, res);
    // TODO: Make project fetching logic here
}

/**
 * Middleware for posting an project to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const insertProject = (req, res) => {

}

/**
 * Middleware for posting an project to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const deleteProject = (req, res) => {

}

module.exports = ProjectService;
