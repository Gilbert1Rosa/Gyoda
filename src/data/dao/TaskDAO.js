const Mapper = require('../../util/oracle/OracleMapper');
const OracleConnection = require('../../util/oracle/OracleConnection');

const TASK_FIELDS = [
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
        name: 'NOMBRE_ASIGNADO',
        objName: 'asigneeName'
    },
    {
        name: 'APELLIDO_ASIGNADO',
        objName: 'asigneeSurname'
    },
    { 
        name: 'NOMBRE_REPORTADO',
        objName: 'reporterName'
    },
    { 
        name: 'APELLIDO_REPORTADO',
        objName: 'reporterSurname'
    },
    {
        name: 'ESTADO',
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
        let query = `SELECT * FROM vTareas WHERE iditeracion = :id`;
        OracleConnection.execute(this.connection, query, { id: iteration }, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 4001 };
                callback(customError, null);
            } else {
                let mappedTasks = Mapper.getRowsAsObjs(data, TASK_FIELDS);
                this.getStates((err, states) => {
                    if (err) {
                        let customError = { message: `Error: ${err}`, errorCode: 4001 };
                        callback(customError, null);
                    } else {
                        let users = Mapper.getRowsAsObjs(data, [
                            {
                                name: 'NOMBRE_ASIGNADO',
                                objName: 'asigneeName'
                            },
                            {
                                name: 'APELLIDO_ASIGNADO',
                                objName: 'asigneeSurname'
                            }
                        ]).map(item => `${item.asigneeName} ${item.asigneeSurname}`);
                        callback(null, {
                            users: users,
                            tasks: mappedTasks,
                            states: states
                        });
                    }
                });
            }
        });
    }

    addTask(task, callback) {
        let command = `CALL CREATE_TASK(:code, :title, :description, :iditeration, :asignee, :reporter, :stateid, :tags)`;
        OracleConnection.execute(this.connection, command, task, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 4002 };
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
                let customError = { message: `Error: ${err}`, errorCode: 4003 };
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
                let customError = { message: `Error: ${err}`, errorCode: 4004 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    getStates(callback) {
        let command = `SELECT * FROM Estados`;
        OracleConnection.execute(this.connection, command, {}, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 4005 };
                callback(customError, null);
            } else {
                let mappedData = Mapper.getFieldForAllRows(data, 'DESCRIPCION');
                callback(null, mappedData);
            }
        });
    }
}