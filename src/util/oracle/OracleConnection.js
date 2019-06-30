const Oracle = require('oracledb');

let connectionOptions

 async function connect(connectionOptions) {
    let connection;
    try {
        connection = await Oracle.getConnection(connectionOptions);
    } catch(err) {
        console.log(`Error al conectarse a la BD: ${err}`);
    }
    return connection;
}

async function execute(connection, command, params, callback) {
    let result = null;
    try {
        if (connection) {
            result = await connection.execute(command, params);
            callback(null, result);
        }
    } catch(err) {
        callback(err, null);
    }
}

async function executeQuery(connection, query, params, callback) {
    execute(connection, query, params, callback);
}

async function close(connection) {
    try {
        await connection.close();
    } catch(err2) {
        console.log(err2);
    }
}

module.exports = {
    connect: connect,
    execute: execute,
    executeQuery: executeQuery,
    close: close
}