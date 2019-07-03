const Mapper = require('../../util/oracle/OracleMapper');
const OracleConnection = require('../../util/oracle/OracleConnection');

const fields = [
    {
        name: 'ID',
        objName: 'id'
    }, 
    {
        name: 'CODIGO',
        objName: 'code'
    },
    { 
        name: 'TITULO',
        objName: 'title'
    },
    {
        name: 'DESCRIPCION',
        objName: 'description'
    },
    { 
        name: 'IDITERACION',
        objName: 'iterationid'
    },
    {
        name: 'ASIGNADO',
        objName: 'asignee'
    },
    { 
        name: 'REPORTADO',
        objName: 'reporter'
    },
    {
        name: 'Estado',
        objName: 'state'
    },
    { 
        name: 'TAGS',
        objName: 'tags'
    }
];



module.exports = class TaskDAO {

    constructor(connection) {
        this.connection = connection;
    }
    
    getTasks(iteration, callback) {
        let query = `SELECT * vTareas WHERE iditeracion = :id`;
        OracleConnection.execute(this.connection, query, { id: iteration }, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                let mappedData = Mapper.getRowsAsObjs(data, fields);
                callback(null, mappedData);
            }
        });
    }

    addTask(task, callback) {
        let command = `CALL CREATE_TASK(:code, :title, :description, :iditeration, :asignee, :reporter, :stateid, :tags)`;
        OracleConnection.execute(this.connection, command, task, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    modifyTask(task, callback) {
        let command = `CALL MODFIY_TASK(:id, :code, :title, :description, :iditeration, :asignee, :reporter, :stateid, :tags)`;
        OracleConnection.execute(this.connection, command, task, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    deleteTask(taskId, callback) {
        let command = `CALL DELETE_TASK(:id)`;
        OracleConnection.execute(this.connection, command, { id: taskId }, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 2002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }
}