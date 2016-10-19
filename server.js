var express        = require('express'),
    bodyParser     = require('body-parser'),
    session        = require('express-session'),
    MongoStore     = require('connect-mongo')(session),
    mongoose       = require('mongoose'),
    logger         = require('morgan'),
    port           = process.env.PORT || 3000,
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

app.use(session({
  secret: 'turnupisthebestappknowntoman loremipsum',
  resave: false,
  saveUninitialized: false,
  maxAge: new Date(Date.now() + 86400000),
  store: new MongoStore(
    {mongooseConnection: mongoose.connection},
    function(err){
      if (err) {console.log(err)}
      else {console.log('session saved')}
    }
  )
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api/projects', require('./controllers/projectsController.js'));
app.use('/api/users', require('./controllers/usersController.js'));
app.use('/api/helpers', require('./controllers/helpersController.js'));
// app.use(function(req, res, next){
//   res.redirect("/");
// });

app.get('/projects/project/:pId', function(req, res){
  console.log(req.params.pId);
  Project.findById(req.params.pId).exec()
  .then(function(project){
    console.log(project);
    res.json(project);
  })
  .catch(function(err){
    console.log(err);
    res.status(500);
  })
});

app.listen(port, function() {
    console.log('=======================');
    console.log('Running on port ' + port);
    console.log('=======================');
});
