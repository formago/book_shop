'use strict'
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');


app.use(logger('dev'));

// DEFINES A FOLDER FOR THE STATIC FILES
app.use(express.static('public'));
// DEFINES THE MAIN ENTRY POINT
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname,
        'public', 'index.html'))
})

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, function () {
    console.log('App web-server listening on port 3000');
});