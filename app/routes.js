var express = require('express');
var router = express.Router();
// var openregister = require('openregister-client');

router.get('/', function (req, res) {
  res.render('index');
});


var config = {
  'register': {
    'register': 'register'
  }
};

// return register data in finder template format
function get_list(register, filter) {

  return [
    { register: 'register', registry: 'cabinet-office', title: 'Registers maintained by HM Government' },
    { register: 'fields', registry: 'cabinet-office', title: 'Fields used in registers maintained by HM Government' }
  ]

}

function filters() {
  return null;
}

router.get('/register/:register', function (req, res) {
  var register = req.params.register;

  var data = {
    config: config[register],
    title: 'Registers maintained by HM Government',
    from: 'Cabinet Office',
    register: 'register',
    organisation: 'cabinet-office',
    list: get_list(register, filters(req.params))
  };
  res.render(register, data);
});


module.exports = router;
