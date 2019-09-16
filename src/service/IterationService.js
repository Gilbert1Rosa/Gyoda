const ServiceHandler = require('../util/ServiceHandler');
const CheckUtil = require('../util/CheckUtil');

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
    router.post(path, SearchIteration);
    router.patch(path, ModifyIteration);
    router.put(path, InsertIteration);
    router.delete(path, DeleteIteration);
    return router;
}

/**
 * Middleware for posting an iteration to be added.
 * 
 * @param {*} req Request object.
 * @param {*} res Response object.
 */
const SearchIteration = (req, res) => {
    const serviceHandler = ServiceHandler(req, res);
    const mandatoryFields = ["project"];
    if (CheckUtil.checkProperties(req.body, mandatoryFields)) {
        iterationDAO.getIterationsByProject(req.body.project, serviceHandler);
    } else {
        var fieldList = CheckUtil.getMissingProperties(req.body, mandatoryFields);
        var err = {
            message: `Los siguientes parametros no se encontraron: ${fieldList.join(",")}`,
            errorCode: "0011"
        }
        serviceHandler(err, {}); // Send error message, in err object
    }
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
    const serviceHandler = ServiceHandler(req, res);
    if (CheckUtil.checkProperties(req.body, ['projectid', 'name', 'startDate', 'endDate'])) {
        iterationDAO.addIteration(req.body, serviceHandler);
    } else {
        res.send(JSON.stringify(BasicResponse(null, `No se pudo agregar el usuario: ${err}`, 2001, false)));
    }
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

