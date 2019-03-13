const basicResponse = require('../util/BasicResponse');

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
    router.post('/iteration', postIteration);
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
    const serviceHandler = (message, errorCode) => {
        return (err, data) => {
            var msg = message !== undefined? message : "";
            var errCode = errorCode !== undefined? errorCode : "";
            if ((!data || data == [] || err) && errorCode !== "" && message !== "") {
                message = `Data not found, an error happened: ${err}`;
            }
            var response = JSON.stringify(basicResponse(data, msg, errCode))
            res.send(response);
        };
    };
    if (req.body) {
        project = req.body.project;
    }
    if (project) {
        iterationDAO.getIterationsByProject(project, serviceHandler());
    } else {
        serviceHandler("Project parameter not found", "0011")({}, {}); // Send error message, no need to pass valid objects to err and data
    }
}

module.exports = IterationService;

