var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport          =     require('passport');

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
var session = require('express-session');
app.use(session({ secret: 'keyboard cat', key: 'sid', resave: true, saveUninitialized: true }));
// Passport session setup.
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.use('/polymer', express.static(__dirname + '/node_modules/@polymer/polymer'));
app.use('/polymer-elements', express.static(__dirname + '/node_modules/npm-polymer-elements'));
app.use('/web-components', express.static(__dirname + '/node_modules/webcomponents.js'));

//controllers
app.use(require("./controllers/index.js"));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(errorHandler);
}

// production error handler
// Pour l'instant le meme qu'en débug
app.use(errorHandler);

function errorHandler(err, req, res, next){
  res.status(err.status || 500);
  console.error(err.message);
  res.render('error', {
    status: err.status,
    name : err.name,
    message : err.message
  });
}
module.exports = app;
