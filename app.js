global.config = require('./conf/config');
global.cache = require('memory-cache');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');

var routes = require('./routes/index');
var logger = require('./logger');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// 中间件
app.use(log4js.connectLogger(logger.express));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        logger.filter.error(err);
        res.status(err.status || 500);
        res.json({
            message: err.message,
            stack: err.stack
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    logger.filter.error(err);
    res.status(err.status || 500);
    res.json({
        message: err.message
    });
});
process.title = 'html5demo';
module.exports = app;
