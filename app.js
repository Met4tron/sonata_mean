var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;

//MongoDB e Mongoose

var conn = mongoose.connect('mongodb://admin:admin@ds111882.mlab.com:11882/sonata').connection;
conn.on('error', function(err) {
    if(err) throw err;
});

conn.once('open', function() {
    console.log('Connected on MongoDB');
})



//Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Rotas

app.use(express.static('public'));

//
var index = require('./routes/index');
var uploads = require('./routes/upload');
app.use('/uploads', uploads);
app.use('/', index);

app.listen(port, function() {
    console.log("Backend is running on port: "+ port);
});

module.exports = app;