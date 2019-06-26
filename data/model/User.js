/**
 *  A user of the system that could have tasks assigned and be in one or serveral projects.
 */
module.exports = class User {
    /**
     * 
     * @param {*} id        ID of the user
     * @param {*} name      Name of the user.
     * @param {*} surname   The surname of the user.
     * @param {*} role      The role of the user.
     * @param {*} password  Password of the user.
     * @param {*} email     email of the user.
     * @param {*} photo     Photo of the user.
     * @param {*} skills    A list of skills of the user.
     */
    constructor(id, name, surname, role, password, email, photo, skills) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.password = password;
        this.email = email;
        this.photo = photo;
        this.skills = skills;
    }
}