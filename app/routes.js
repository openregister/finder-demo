'use strict';

var express = require('express');
var router = express.Router();
var finders = require('./finders');


/*
 *  index page
 */
router.get('/', function (req, res) {
  res.render('index', { finders: finders.finders() });
});


/*
 *  finder page
 */
router.get('/register/:register', function (req, res) {

  var register = req.params.register;
  var finder = finders.finder(register);

  finder.list(req.params, function (err, list) {
    res.render("register", {
      finder: finder,
      list: list
    });
  });
});

module.exports = router;
