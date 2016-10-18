var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

router.post('/signup', function(req, res){
  User.register(new User(
    {username: req.body.username}),
    req.body.password, function(err, user){
      if (err) console.log(err);
      res.json(201,'success');
    });
});

router.post('/login', passport.authenticate('local'), function(req, res){
  req.session.save(function(err) {
    if (err) console.log(err);

    res.json({user: req.user});
  })
});

router.delete('/logout', function(req, res){
  req.logout();
  res.json("User logged out.")
});

module.exports = router;
