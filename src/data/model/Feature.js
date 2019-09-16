/**
 *  This class is used to store a Feature associated to an user, used to determine
 *  what UI features that user can access.
 * 
 */
module.exports = class Feature {
    /**
     * 
     * @param {int}    id           Id for the feature.
     * @param {string} code         Code for the feature.
     * @param {string} description  Description for the feature.
     */
    constructor(id, code, description) {
        this.id = id;
        this.code = code;
        this.description = description;
    }
}