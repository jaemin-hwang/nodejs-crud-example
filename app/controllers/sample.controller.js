var Sample = require('../models/sample.model.js');

exports.create = function(req, res) {
    // Create and Save a new Sample
    if(!req.body.content) {
        res.status(400).send({message: "Sample can not be empty"});
    }

    var sample = new Sample({title: req.body.title || "Untitled Sample", content: req.body.content});

    sample.save(function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "Create Error"});
        } else {
            res.send(data);
        }
    });
};

exports.findAll = function(req, res) {
    // Retrieve and return all samples from the database.
    Sample.find(function(err, samples){
        if(err) {
            res.status(500).send({message: "FindAll Error"});
        } else {
            res.send(samples);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single sample with a sampleId
    Sample.findById(req.params.sampleId, function(err, data) {
        if(err) {
            res.status(500).send({message: "FineOne Error " + req.params.sampleId});
        } else {
            res.send(data);
        }
    });
};

exports.update = function(req, res) {
    // Update a sample identified by the sampleId in the request
    Sample.findById(req.params.sampleId, function(err, sample) {
        if(err) {
            res.status(500).send({message: "Update Error " + req.params.sampleId});
        }

        sample.title = req.body.title;
        sample.content = req.body.content;

        sample.save(function(err, data){
            if(err) {
                res.status(500).send({message: "Update Error " + req.params.sampleId});
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function(req, res) {
    // Delete a sample with the specified sampleId in the request
    Sample.remove({_id: req.params.sampleId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Delete Error " + req.params.id});
        } else {
            res.send({message: "Delete Sucess!"})
        }
    });
};

