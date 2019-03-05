module.exports = class User {
    constructor(id, name, password, email, photo) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.email = email;
        this.photo = photo;
    }
}