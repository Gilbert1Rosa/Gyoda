const fs = require('fs');
const UserFactory = require('../../factory/UserFactory');

module.exports = class MockUserDAO {
    constructor() {
        this.file = './mock-data/Users.json';
    }
    
    getUsers(callback) {
        fs.readFile(this.file, callback);
    }

    getUserById(id, callback) {
        this.getUsers((err, data) => {
            if (!err && callback != undefined) {
                var users = `${data}`.replace(/\s/g,'');
                callback(err, UserFactory(users));
            }
        })
    }

    findUsersByName(name, callback) {

    }
}