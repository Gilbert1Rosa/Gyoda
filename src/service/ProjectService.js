const ServiceHandler = require('../util/ServiceHandler');

let path = '/project';
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
    router.post(path, SearchProject);
    router.patch(path, ModifyProject);
    router.put(path, InsertProject);
    router.delete(path, DeleteProject);
    return router;
}

/**
 * Middleware for posting a project to be searched.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const SearchProject = (req, res) => {
    var project = null;
    const serviceHandler = ServiceHandler(req, res);
    // TODO: Make project fetching logic here
}

/**
 * Middleware for patching a project to be modified.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const ModifyProject = (req, res) => {

}

/**
 * Middleware for posting a project to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertProject = (req, res) => {
    // TODO: Make project inserting logic here
}

/**
 * Middleware for posting a project to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteProject = (req, res) => {
    // TODO: Make project deleting logic here
}

module.exports = ProjectService;
