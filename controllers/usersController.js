var express = require('express'),
    router  = express.Router(),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

router.post('/register', function(req, res){
  User.register(new User(
    {username: req.body.username}),
    req.body.password, function(err, user){
      if (err) {
        res.json(err);
      }
      else {
        req.login(user, function(err){
          if (err) {res.json(err)}
          else {
            console.log(req.user.username)
            res.json({status: 201, statusText: 'success', user: user});
          }
        });
      }
    });
});

router.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if (err) {
      return res.json({err});
    }
    if (!user) {
      return res.json({message: "<strong>Authentication Failed!</strong> Check your username and password!"});
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.json({success: true});
    });
  })(req, res, next);
});

router.delete('/logout', function(req, res){
  req.logout();
  res.json("User logged out.")
});

module.exports = router;
