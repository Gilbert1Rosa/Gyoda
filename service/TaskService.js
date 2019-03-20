const basicResponse = require('../util/BasicResponse');

let taskDAO;

const getHandler = (res) => {
    return (err, data) => {
        var message = "";
        var errorCode = "";
        if (!data || data == [] || err) {
            message = `Data not found, an error happened: ${err}`;
        }
        var response = JSON.stringify(basicResponse(data, message, errorCode))
        res.send(response); 
    };
}

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
        const serviceHandler = getHandler(res);
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

