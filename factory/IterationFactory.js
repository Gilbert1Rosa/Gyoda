var Iteration = require('../data/model/Iteration');

/**
 * Creates an Iteration object from a JSON representation.
 * 
 * @param {*} iterationJSON  Data of the iteration to be converted to an iteration object.
 * 
 * @returns {Iteration}  The Iteration object that represents the iteration on the JSON.
 */
const IterationFactory = (iterationJSON) => {
    var iterationData = JSON.parse(iterationJSON);
    var iterations = [];
    for (let iteration of iterationData) {
        iterations.push(new Iteration(iteration.code, iteration.project, iteration.start, iteration.end));
    }
    return iterations;
}

module.exports = IterationFactory;