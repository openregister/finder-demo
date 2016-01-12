'use strict';

var http = require('http');


function host(register) {
  return register + '.openregister.org';
}


function item_path(register, field, value) {
  if (!field) {
    field = register;
  }

  // TBD: escape
  return '/' + field + '/' + value;
}


// TBD: caching!
function get_json(register, path, callback) {
  return http.get({
    host: host(register),
    path: path
  }, function(response) {
    var body = '';
    response.on('data', function(data) {
      body += data;
    });
    response.on('end', function() {
      var err = null;
      try {
        var o = JSON.parse(body);
        callback(err, o);
      } catch (e) {
        console.error(e)
      }
    });
  });
}


function records(register, callback) {

  var path = "/records.json?page-size=5000";
  var err = null;

  get_json(register, path, function (err, entries) {

    var items = entries.map(function (entry) {
      return entry.entry;
    });

    callback(err, items);
  });
}


module.exports = {
  records: records
};
