/**
 * A task that is associated to a project and a user.
 */
module.exports = class Task {
    /**
     * 
     * @param {string} code         Code of the task.          
     * @param {string} title        Title of the task.
     * @param {string} description  Description of the task.
     * @param {int} project         ID of the project which the task belongs.
     * @param {int} user            ID of the user which the task is assigned.
     */
    constructor(code, title, description, project, user) {
        this.code = code;
        this.title = title;
        this.description = this.description;
        this.project = project;
        this.user = user;
    }
}