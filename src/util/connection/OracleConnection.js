const Oracle = require('oracledb');

let connectionOptions
let connection;

let connect = () => {
    connectionOptions = arguments.connectionOptions;
}

let execute = (callback) => {

}

let executeQuery = (callback) => {

}

let close = () => {

}

module.exports = {
    connect: connect,
    execute: execute,
    executeQuery = executeQuery,
    close: close
}