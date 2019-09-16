/**
 *  Represents a project in the system.
 */
module.exports = class Project {
    /**
     * Constructor.
     * 
     * @param {*} id            Id of the project
     * @param {*} code          Code of the project.
     * @param {*} name          Name of the project.
     * @param {*} description   Description of the project.
     */
    constructor(id, code, name, description) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.description = description;
    }
}