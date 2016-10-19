var express = require('express');
var router = express.Router();

//helpers/get-user
router.get('/get-user', function(req, res) {
  var user = req.user // it adds the user to the request object
  res.json({user: user})
})

module.exports = router;
