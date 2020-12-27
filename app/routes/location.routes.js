module.exports = function(app) {

    var location = require('../controllers/location.controller.js');

    // Create a new Sample
    app.post('/location', location.create);

    // Retrieve all Samples
    app.get('/location', location.findAll);

    // Retrieve a single Sample with sampleId
    app.get('/location/:sampleId', location.findOne);

    // Retrieve a lat-long for finding nerarest locations
    app.get('/locationFinder', location.findLocation);

    // Update a Sample with sampleId
    app.put('/location/:sampleId', location.update);

    // Delete a Sample with sampleId
    app.delete('/location/:sampleId', location.delete);
}
