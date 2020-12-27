var Location = require('../models/location.model.js');

exports.create = function(req, res) {
    // Create and Save a new Location
    if(!req.body.points) {
        res.status(400).send({message: "location can not be empty"});
    }
console.log(req.body);
    var location = new Location({location_name: req.body.location_name, points: req.body.points, emotion: req.body.emotion});

    location.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Some error occurred while creating the Location."});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all samples from the database.
    Location.find(function(err, samples){
        if(err) {
            res.status(500).send({message: "Some error occurred while retrieving locations."});
        } else {
            res.send(samples);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single sample with a sampleId
    Location.findById(req.params.sampleId, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not retrieve location with id " + req.params.sampleId});
        } else {
            res.send(data);
        }
    });
};

exports.findLocation = function(req, res, next) {
  var limit = req.query.limit || 10;

      // get the max distance or set it to 8 kilometers
      var maxDistance = req.query.distance || 8;

      // we need to convert the distance to radians
      // the raduis of Earth is approximately 6371 kilometers
      maxDistance /= 6371;

      // get coordinates [ <longitude> , <latitude> ]
      var coords = [];
      coords[0] = parseFloat(req.query.longitude) || 0;
  coords[1] = parseFloat(req.query.latitude) || 0;

      // find a location
      Location.aggregate(
        [
{
      $geoNear: {
       near: { type: "Point", coordinates: coords },
       distanceField: "dist.calculated",
       includeLocs: "dist.location",
       spherical: true
    }
}
  ]
      ).limit(limit).exec(function(err, locations) {
        if (err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while retrieving locations."});

        }
        res.send(locations);
      });
};

exports.update = function(req, res) {
    // Update a sample identified by the sampleId in the request
    Location.findById(req.params.sampleId, function(err, sample) {
        if(err) {
            res.status(500).send({message: "Could not find a sample with id " + req.params.sampleId});
        }

        sample.title = req.body.title;
        sample.content = req.body.content;

        sample.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Could not update sample with id " + req.params.sampleId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a sample with the specified sampleId in the request
    Location.remove({_id: req.params.sampleId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete sample with id " + req.params.id});
        } else {
            res.send({message: "Sample deleted successfully!"})
        }
    });
};
