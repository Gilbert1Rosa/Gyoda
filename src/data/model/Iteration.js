/**
 *  Iteration holds the information for a determined iteration in a project.
 */
module.exports = class Iteration {
    /**
     * 
     * @param {int}    code     Code for the iteration.
     * @param {*}      project  The id for the project which this iteration belongs.
     * @param {string} start    Start date and time.
     * @param {string} end      End date and time.
     */
    constructor(code, project, start, end) {
        this.code = code;
        this.project = project;
        this.start = start;
        this.end = end;
    }
}