const fs = require('fs');
const UserFactory = require('../../factory/UserFactory');

module.exports = class MockUserDAO {
    constructor() {
        this.file = './mock-data/Users.json';
    }

    loadUsers(callback) {
        fs.readFile(this.file, callback);
    }
    
    getUsers(callback) {
        this.loadUsers((err, data) => {
            var users;
            if (!err && callback != undefined) {
                users = UserFactory(`${data}`);
            }
            callback(err, users);
        });
    }

    getUserById(id, callback) {
        var userId = id;
        this.getUsers((err, data) => {
            var result = [];
            if (!err) {
                for (let user of data) {
                    if (user.id == userId) {
                        result.push(user);
                    }
                }
            }
            callback(err, result);
        });
    }

    getUserByCredentials(name, pass, callback) {
        this.getUsers((err, data) => {
            var result = [];
            if (!err) {
                for (let user of data) {
                    if (user.name == name && user.password == pass) {
                        result.push(user);
                    }
                }
            }
            callback(err, result);
        });
    }
}