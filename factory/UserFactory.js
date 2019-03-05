var User = require('../data/model/User');

module.exports = (usersJSON) => {
    var userData = JSON.parse(usersJSON);
    var users = [];
    for (let user of userData) {
        users.push(new User(user.id, user.name, user.password, user.email, user.photo));
    }
    return users;
}