/**
 *  Creates an object with the form needed by a basic response.
 * 
 *  @param {*}      data             Main data to be sent in the message.
 *  @param {string} message          Optional error message to be sent (empty if no error).
 *  @param {int}    errorCode        Optional error code to be sent (0 if no error).
 */
module.exports = (data, message, errorCode) => {
    return {
        data: data,
        message: message ? message : "",
        error_code: errorCode ? errorCode : 0
    };
}