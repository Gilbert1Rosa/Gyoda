var User = require('../data/model/User');

module.exports = (usersJSON) => {
    var userData = JSON.parse(usersJSON);
    var users = [];
    for (let user in userData) {
        console.log(user);
        users.push(new User(user.id, user.name, user.email, user.photo));
    }
    return users;
}