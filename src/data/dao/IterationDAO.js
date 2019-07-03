const Mapper = require('../../util/oracle/OracleMapper');
const OracleConnection = require('../../util/oracle/OracleConnection');
const moment = require('moment');

const fields = [
    {
        name: 'NOMBRE',
        objName: 'name'
    },    
    {
        name: 'TITULO',
        objName: 'title'
    },    
    {
        name: 'FECHAINICIO',
        objName: 'startDate'
    },
    {
        name: 'FECHAFIN',
        objName: 'endDate'
    }
];

module.exports = class IterationDAO {

    constructor(connection) {
        this.connection = connection;
    }
    
    getIterationsByProject(project, callback) {
        let finalQuery = `SELECT * FROM vIteraciones WHERE proyecto = :project`;
        let fields = { project: project };
        OracleConnection.executeQuery(this.connection, finalQuery, fields, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 1002 };
                callback(customError, null);
            } else {
                let mappedData = Mapper.getRowsAsObjs(data, fields);
                callback(null, mappedData);
            }
        });
    }

    addIteration(iteration, callback) {
        let command = `CALL ADD_ITERATION_TO_PROJECT(:projectid, :name, :startDate, :endDate)`;
        iteration.startDate = moment(iteration.startDate, "DD-MM-YYYY").toDate();
        iteration.endDate = moment(iteration.endDate, "DD-MM-YYYY").toDate();
        OracleConnection.execute(this.connection, command, iteration, {}, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 1002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }
}