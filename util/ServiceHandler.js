const basicResponse = require('./BasicResponse');

const getHandler = (req, res) => {
    return (err, data) => {
        var message = "";
        var errorCode = "";
        if (!data || data == [] || err) {
            message = `Data not found, an error happened: ${err}`;
        }
        message = err.message ? err.message : message;
        errorCode = err.errorCode ? err.errorCode : errorCode;
        var response = JSON.stringify(basicResponse(data, message, errorCode))
        res.send(response); 
    };
}

module.exports = getHandler