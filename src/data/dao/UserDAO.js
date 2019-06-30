const UserFactory = require('../../factory/UserFactory');
const Mapper = require('../../util/oracle/OracleMapper');
const OracleConnection = require('../../util/oracle/OracleConnection');

let userField = [{
    name: 'ID',
    objName: 'id'
},
{
    name: 'NOMBRE',
    objName: 'name'
},
{
    name: 'APELLIDO',
    objName: 'surname'
},
{
    name: 'CLAVE',
    objName: 'password'
},
{
    name:'EMAIL',
    objName: 'email'
},
{
    name: 'ROL',
    objName: 'role'
}];

module.exports = class UserDAO {

    constructor(connection) {
        this.connection = connection;
    }

    loadUsers(query, callback) {
        let finalQuery = query && query !== ''? query : `SELECT * FROM vUsuarios`;
        try {
            OracleConnection.executeQuery(this.connection, finalQuery, [], data => {
                let mappedData = Mapper.getDifferentRowsAsObjs(data, userField, 'id');
                mappedData.forEach(user => {
                    user.skills = this.getUserSkills(data, user);
                });
                callback(null, mappedData);
            });
        } catch(err) {
            let customError = { message: `Error: ${err}`, errorCode: 1000 };
            callback(customError, null);
        }
    }

    getUsers(callback) {
        this.loadUsers('', callback);
    }

    getUserByCredentials(name, pass, callback) {
        this.loadUsers(`SELECT * FROM vUsuarios WHERE nombre = '${name}' AND clave = '${pass}'`, callback);
    }

    getUserById(id, callback) {
        this.loadUsers(`SELECT * FROM vUsuarios WHERE id = ${id}`, callback);
    }

    findUsersByName(name, callback) {
        this.loadUsers(`SELECT * FROM vUsuarios WHERE nombre LIKE '${name}%'`, callback);
    }

    getUserSkills(data, user) {
        let fields = [];
        userField.forEach(field => { fields.push(field) });
        fields.push({ name: 'COMPETENCIA', objName: 'skills'});
        let notMappedData = Mapper.getRowsAsObjs(data, fields);
        let skills = notMappedData.filter(obj => {
            return obj.id === user.id;
        })
        .map(obj => {
            return obj.skills;
        });
        return skills;
    }
}