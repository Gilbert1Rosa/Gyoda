/**
 *  A user of the system that could have tasks assigned and be in one or serveral projects.
 */
module.exports = class User {
    /**
     * 
     * @param {*} id        ID of the user
     * @param {*} name      Name of the user.
     * @param {*} password  Password of the user.
     * @param {*} email     email of the user.
     * @param {*} photo     Photo of the user.
     */
    constructor(id, name, password, email, photo) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.photo = photo;
    }
}