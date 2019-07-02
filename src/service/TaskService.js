const ServiceHandler = require('../util/ServiceHandler');

let path = '/task';
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
    router.post(path, SearchTask);
    router.patch(path, ModifyTask);
    router.put(path, InsertTask);
    router.delete(path, DeleteTask);
    return router;
}

/**
 * Middleware for posting a task to be searched.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const SearchTask = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
}

/**
 * Middleware for modifying a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const ModifyTask = (req, res) => {

}

/**
 * Middleware for inserting a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertTask = (req, res) => {

}

/**
 * Middleware for deleting a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteTask = (req, res) => {

}

module.exports = TaskService;

/**
 *  Gets the Data provider for the tasks.
 */
module.exports.getTaskDAO = () => {
    return taskDAO;
}

