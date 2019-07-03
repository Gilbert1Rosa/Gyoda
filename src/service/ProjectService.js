const ServiceHandler = require('../util/ServiceHandler');
const CheckUtil = require('../util/CheckUtil');


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
    const serviceHandler = ServiceHandler(req, res);
    projectDAO.getProjects(serviceHandler);
}

/**
 * Middleware for patching a project to be modified.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const ModifyProject = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['id', 'title', 'description'])) {
        projectDAO.modifyProject(req.body, serviceHandler);
    }
}

/**
 * Middleware for posting a project to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertProject = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['title', 'description'])) {
        projectDAO.addProject(req.body, serviceHandler);
    }
}

/**
 * Middleware for posting a project to be deleted.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteProject = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['id'])) {
        projectDAO.deleteProject(req.body.id, serviceHandler);
    }
}

module.exports = ProjectService;
