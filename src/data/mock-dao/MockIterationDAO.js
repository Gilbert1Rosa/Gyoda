const fs = require('fs');
const IterationFactory = require('../../factory/IterationFactory');

module.exports = class MockIterationDAO {
    constructor() {
        this.file = './src/mock-data/Iteration.json';
    }

    loadIterations(callback) {
        fs.readFile(this.file, callback);
    }

    getIterations(callback) {
        this.loadIterations((err, data) => {
            var iterations;
            if (!err && callback != undefined) {
                iterations = IterationFactory(`${data}`);
            }
            callback(err, iterations);
        });
    }
    
    getIterationsByProject(project, callback) {
        this.getIterations((err, data) => {
            var result = [];
            if (!err) {
                for (let iteration of data) {
                    if (iteration.project == project) {
                        result.push(iteration);
                    }
                }
            }
            callback(err, result);
        });
    }
}