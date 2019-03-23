const ServiceHandler = require('../util/ServiceHandler');

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
    router.post('/iteration', app.oauth.authorise(), postIteration);
    return router;
}

/**
 * Middleware for posting an iteration to be added
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const postIteration = (req, res) => {
    var project = null;
    const serviceHandler = ServiceHandler(req, res);
    if (req.body) {
        project = req.body.project;
    }
    if (project) {
        iterationDAO.getIterationsByProject(project, serviceHandler);
    } else {
        var err = {
            message: "Project parameter not found", 
            errorCode: "0011"
        }
        serviceHandler(err, {}); // Send error message, in err object
    }
}

module.exports = IterationService;

