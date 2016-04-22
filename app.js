var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//TODO a bouger quand il y aura d'autres types de connection
//On ne peut pas mettre ce bout de code dans le controller authFacebook, sinon la connection se fait juste sur l'url du controler
// et la méthode ensureAuthentifié return false.
var connexionFB = require('./models/connexionFB.js');
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', key: 'sid', resave: true, saveUninitialized: true }));
app.use(connexionFB.initialize());
app.use(connexionFB.session());


app.use('/polymer', express.static(__dirname + '/node_modules/@polymer/polymer'));
app.use('/polymer-elements', express.static(__dirname + '/node_modules/npm-polymer-elements'));
app.use('/web-components', express.static(__dirname + '/node_modules/webcomponents.js'));

//controllers
app.use(require("./controllers/index.js"));

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

module.exports = app;
