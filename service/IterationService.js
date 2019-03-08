const basicResponse = require('../util/BasicResponse');

let iterationDAO;

module.exports = (app, router, injectedIterationDAO) => {
    iterationDAO = injectedIterationDAO;   
    router.post('/iteration', (req, res) => {
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
    });
    return router;
}