const ServiceHandler = require('../util/ServiceHandler');
const CheckUtil = require('../util/CheckUtil');
const BasicResponse = require('../util/BasicResponse');

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
    if (CheckUtil.checkProperties(req.body, ['iterationid'])) {
        taskDAO.getTasks(req.body.iterationid, serviceHandler);
    } else {
        res.send(JSON.stringify(BasicResponse(null, `No se pudo obtener las tareas: faltan parametros`, 2000, false)));
    }
}

/**
 * Middleware for modifying a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const ModifyTask = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['id', 'code', 'title', 'description', 'iditeration', 
                                             'asignee', 'reporter', 'stateid', 'tags'])) {
        taskDAO.modifyTask(req.body, serviceHandler);
    } else {
        res.send(JSON.stringify(BasicResponse(null, `No se pudo modificar la tarea: faltan parametros`, 2000, false)));
    }
}

/**
 * Middleware for inserting a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const InsertTask = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['code', 'title', 'description', 'iditeration', 
                                             'asignee', 'reporter', 'stateid', 'tags'])) {
        taskDAO.addTask(req.body, serviceHandler);
    } else {
        res.send(JSON.stringify(BasicResponse(null, `No se pudo agregar la tarea: faltan parametros`, 2000, false)));
    }
}

/**
 * Middleware for deleting a task.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const DeleteTask = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['id'])) {
        taskDAO.deleteTask(req.body.id, serviceHandler);
    } else {
        res.send(JSON.stringify(BasicResponse(null, `No se pudo eliminar la tarea: faltan parametros`, 2000, false)));
    }
}

module.exports = TaskService;

/**
 *  Gets the Data provider for the tasks.
 */
module.exports.getTaskDAO = () => {
    return taskDAO;
}

