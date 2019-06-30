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
    }
];

module.exports = class UserDAO {

    constructor(connection) {
        this.connection = connection;
    }

    loadUsers(query, callback) {
        let finalQuery = query && query !== ''? query : `SELECT * FROM vUsuarios`;
        try {
            OracleConnection.executeQuery(this.connection, finalQuery, [], (err, data) => {
                if (err) { 
                    let customError = { message: `Error: ${err}`, errorCode: 1002 };
                    callback(customError, null);
                } else {
                    let mappedData = Mapper.getDifferentRowsAsObjs(data, userField, 'id');
                    mappedData.forEach(user => {
                        user.skills = this.getUserSkills(data, user);
                    });
                    callback(null, mappedData);
                }
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

    addUser(user, callback) {
        let mappedUser = {};
        let command = `CALL CREATE_USER(:id, :name, :surname, :password, :photo, :email, :role, :skills)`;
        Object.assign(mappedUser, user);
        mappedUser.photo = Buffer.from(user.photo);
        OracleConnection.execute(this.connection, command, mappedUser, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 1001 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    modifyUser(user, callback) {
        let mappedUser = {};
        let command = `CALL MODIFY_USER(:id, :name, :surname, :password, :photo, :email, :role, :skills)`;
        Object.assign(mappedUser, user);
        mappedUser.photo = Buffer.from(user.photo);
        OracleConnection.execute(this.connection, command, mappedUser, (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 1002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
    }

    deleteUser(id, callback) {
        let command = `CALL DELETE_USER(${id})`;
        OracleConnection.execute(this.connection, command, [], (err, data) => {
            if (err) { 
                let customError = { message: `Error: ${err}`, errorCode: 1002 };
                callback(customError, null);
            } else {
                callback(null, data);
            }
        });
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