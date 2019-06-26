/**
 *  A Role is associated to an user, and is basically a collecction of features.
 */
module.exports = class Role {
    
    /**
     * 
     * @param {*} id        Id of the Role.
     * @param {*} name      Name of the Role.
     * @param {*} features  Features associated to a Role.
     */
    constructor(id, name, features) {
        this.id = id;
        this.name = name;
        this.features = features;
    }
}