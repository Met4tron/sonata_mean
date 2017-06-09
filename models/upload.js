var mongoose = require('mongoose');

var UploadSchema = mongoose.Schema({
    title: String,
    created_at: Date,
    file: Object
});

module.exports = mongoose.model('Upload', UploadSchema);