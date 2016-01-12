'use strict';

var openregister = require('./openregister-client');


// finders ..
var finder_register = require('./finders/register.js');
var finder_field = require('./finders/field.js');


var config = {

  finders: {
    'register': finder_register,
    'field': finder_field
  },

  filters: {
  }
};


function items(finder, callback) {
  var err = null;

  openregister.records(finder.register, function (err, items) {
    callback(err, items);
  });
}


function list(params, callback) {
  var finder = this;
  var err = null;

  items(finder, function(err, items) {
    callback(err, items.map(finder.map));
  });
}


function finders() {
  return config.finders;
}


function finder(name) {
  var finder = config.finders[name];

  if (!finder.list) {
    finder.list = list;
  }
  return finder;
}


module.exports = {
  finders: finders,
  finder: finder
};
