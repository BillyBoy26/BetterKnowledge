var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var SHA256 = require("crypto-js/sha256");
var btoa = require('btoa');
var session = require('express-session');
var connexionFB = require('./BK-modules/connexionFB.js');

var app = express();

process.on('uncaughtException', function(err) {
  // handle the error safely
  console.error(err);
  //throw err;
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(connexionFB.initialize());
app.use(connexionFB.session());
app.use(express.static(path.join(__dirname, 'public')));



app.get('/logged', ensureAuthenticated, function(req, res){

  //embedParam pour Gruveo
  //TODO dans le tuto c'est dans le client  mais je pense qu c'est mieux de les mettre ici
  var generated = new Date();
  //TODO mettre une vrai cl��
  var secret = 'YOUR_API_KEY';
  var hash = SHA256(generated, secret);
  var signature = btoa(hash);

  res.render('logged', {
    user: req.user,
    generated: generated,
    signature:signature
  });
});

//Passport Router
app.get('/auth/facebook', connexionFB.authenticate('facebook'));
app.get('/auth/facebook/callback',
    connexionFB.authenticate('facebook', {
      successRedirect : '/logged',
      failureRedirect: '/error'
    }),
    function(req, res) {
      res.redirect('/logged');
    });


app.get('/', function(req, res){
	  res.render('accueil');
	});


app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/error')
}
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
