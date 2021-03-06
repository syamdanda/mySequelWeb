var express = require('express');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/api');

var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var app_host;
var app_port;

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    // set app defaults
    app_host = process.env.HOST || 'localhost';
    app_port = process.env.PORT || 1234;
} else {
    app_host = process.env.HOST;
    app_port = process.env.PORT;
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



// lift the app
app.listen(app_port, app_host, function (){
    console.log('mySequelWeb listening on host: http://' + app_host + ':' + app_port);    
}).on('error', function (err){
    if(err.code === 'EADDRINUSE'){
        console.error('Error starting mySequelWeb: Port ' + app_port + ' already in use, choose another');
    }else{
        console.error('Error starting mySequelWeb: ' + err);
        app.emit('errorMySequelWeb');
    }
});


module.exports = app;
