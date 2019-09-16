var User = require('../data/model/User');
/**
 * Creates an User object from a JSON representation.
 * 
 * @param {*} usersJSON Data of the user to be converted to an user object.
 * 
 * @returns {User}  The User object that represents the user on the JSON.
 */
const UserFactory = (usersJSON) => {
    var userData = JSON.parse(usersJSON);
    var users = [];
    for (let user of userData) {
        users.push(new User(user.id, user.name, user.surname, user.role, user.password, user.email, user.photo, user.skills.split(",")));
    }
    return users;
}

module.exports = UserFactory;