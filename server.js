var express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    port           = 3000 || process.env.PORT,
    passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    User           = require('./models/user'),
    app            = express();

mongoose.Promise = global.Promise;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/turnuptimesystem';
mongoose.connect(mongoURI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/bower_components'))

app.use(require('express-session')({
  secret: 'turnupisthebestappknowntoman loremipsum',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/projects', require('./controllers/projectsController.js'));
app.use('/api/users', require('./controllers/usersController.js'));
app.use(function(req, res, next){
  res.redirect("/");
});

app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});
