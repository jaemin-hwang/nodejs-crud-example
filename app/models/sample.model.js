var mongoose = require('mongoose');

var SampleSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Sample', SampleSchema);
