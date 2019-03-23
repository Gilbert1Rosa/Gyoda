const ServiceHandler = require('../util/ServiceHandler');

let taskDAO;

/**
 *  The TaskService function is intended to be a middleware
 *  for managing tasks of users.
 * 
 *  @param {*}       app              Express middleware object.
 *  @param {*}       router           Express router
 *  @param {TaskDAO} injectedTaskDAO  Data provider for the tasks.
 */
const TaskService = (app, router, injectedTaskDAO) => {
    taskDAO = injectedTaskDAO;
    router.post('/task', app.oauth.authorise(), (req, res) => {
        const serviceHandler = ServiceHandler(req, res);
    });
    router.put('/task', app.oauth.authorise(), (req, res) => {

    });
    router.delete('/task', app.oauth.authorise(), (req, res) => {

    });
    return router;
}

module.exports = TaskService;

/**
 *  Gets the Data provider for the tasks.
 */
module.exports.getTaskDAO = () => {
    return taskDAO;
}

