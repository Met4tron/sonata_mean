var express = require('express');
var router = express.Router();
var fs = require('fs');
var uploadModel = require('../models/upload');
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

router.post('/', upload.single('file'), function (req, res, next) {
    var newUpload = {
        title: req.body.title,
        created_at: Date.now(),
        file: req.file
    };
    uploadModel.create(newUpload, function (err, next) {
        if (err) {
            console.error(err);
        } else {
            res.send(newUpload);
        }
    });
});

router.get('/', function (req, res, next) {
    uploadModel.find({}, function (err, uploads) {
        if (err) next(err);
        else {
            res.send(uploads);
        };
    });
});

router.get('/:uuid/:filename', function (req, res, next) {
    console.log(req.params);
    uploadModel.findOne({
        'file.filename': req.params.uuid,
        'file.originalname': req.params.filename
    }, function (err, upload) {
        if (err) next(err);
        else {
            res.set({
                "Content-Disposition": 'attachment; filename="' + upload.file.originalname + '"',
                "Content-Type": upload.file.mimetype
            });
            fs.createReadStream(upload.file.path).pipe(res);
        }
    })
});

router.delete('/:uuid', function (req, res, next) {
    uploadModel.remove({
        'file.filename': req.params.uuid
    }, function (err, upload) {
        if(err) next(err);
        else {
            console.log("Delete with Success")
        }
    })
})

module.exports = router;