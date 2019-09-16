const Mapper = require('../../util/oracle/OracleMapper');
const OracleConnection = require('../../util/oracle/OracleConnection');

const fields = [
    {
        name: 'ID',
        objName: 'id'
    },    
    {
        name: 'TITULO',
        objName: 'title'
    },    
    {
        name: 'DESCRIPCION',
        objName: 'description'
    }
];

module.exports = class ProjectDAO {

    constructor(connection) {
        this.connection = connection;
    }

    getProjects(callback) {
        let query = `SELECT * FROM vProyectos`;
        OracleConnection.execute(this.connection, query, {}, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                let mappedData = Mapper.getRowsAsObjs(data, fields);
                callback(null, mappedData);
            }
        });
    }

    addProject(project, callback) {
        let command = `CALL CREATE_PROJECT(:title, :description)`;
        OracleConnection.execute(this.connection, command, project, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    modifyProject(project, callback) {
        let command = `CALL MODIFY_PROJECT(:id, :title, :description)`;
        OracleConnection.execute(this.connection, command, project, {}, (err, data) => {
            if (err) {
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    deleteProject(projectid, callback) {
        let command = `CALL DELETE_PROJECT(${projectid})`;
        OracleConnection.execute(this.connection, command, [], {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }
}