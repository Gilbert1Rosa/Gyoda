module.exports = (data, message, errorCode) => {
    return {
        data: data,
        message: message,
        error_code: errorCode
    };
}