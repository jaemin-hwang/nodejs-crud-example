module.exports = function(app) {

    var samples = require('../controllers/sample.controller.js');

    // Create a new Sample
    app.post('/samples', samples.create);

    // Retrieve all Samples
    app.get('/samples', samples.findAll);

    // Retrieve a single Sample with sampleId
    app.get('/samples/:sampleId', samples.findOne);

    // Update a Sample with sampleId
    app.put('/samples/:sampleId', samples.update);

    // Delete a Sample with sampleId
    app.delete('/samples/:sampleId', samples.delete);
}