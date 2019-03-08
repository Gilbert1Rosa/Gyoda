var Iteration = require('../data/model/Iteration');

module.exports = (iterationJSON) => {
    var iterationData = JSON.parse(iterationJSON);
    var iterations = [];
    for (let iteration of iterationData) {
        iterations.push(new Iteration(iteration.code, iteration.project, iteration.start, iteration.end));
    }
    return iterations;
}