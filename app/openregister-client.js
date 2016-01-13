'use strict';

var http = require('http');


function host(register) {
  return register + '.openregister.org';
}


function item_path(register, field, value) {
  if (!field) {
    field = register;
  }

  return '/' + field + '/' + escape(value);
}


// TBD: caching!
function get_json(register, path, callback) {

  var url = {
    host: host(register),
    path: path
  };

  return callback(null, [{"serial-number":20,"hash":"bb9e892b5b04d171f1d8af9f449d46b2d4b8940e","entry":{"fields":["food-premises","name","business","food-premises-types","local-authority","premises","start-date","end-date"],"phase":"alpha","register":"food-premises","registry":"food-standards-agency","text":"Premises which prepare and serve food"}},{"serial-number":18,"hash":"401c9ad49aed68eed0083341b13c8e8d4a09c0dd","entry":{"fields":["school","name","start-date","end-date","gender","religious-character","minimum-age","maximum-age","headteacher","website","address"],"phase":"alpha","register":"school","registry":"department-for-education","text":"Primary, secondary and special needs schools in England and Wales"}},{"serial-number":17,"hash":"f5902bb26bceb5fa4368e2be5db65c4ba139ed41","entry":{"fields":["registry"],"phase":"alpha","register":"registry","registry":"cabinet-office","text":"Bodies responsible for the maintainance of one or more registers"}},{"serial-number":16,"hash":"b51e90b4e68186503c8cb1b25ba672ef5c170bb0","entry":{"fields":["register","text","registry","phase","copyright","fields"],"phase":"alpha","register":"register","registry":"cabinet-office","text":"Registers maintained by HM Government"}},{"serial-number":15,"hash":"701b682581fd06b346fb8d2126c378ee2cf369fc","entry":{"fields":["public-body","name","website","public-body-type","parent-bodies","text","crest","official-colour"],"phase":"alpha","register":"public-body","registry":"cabinet-office","text":"Ministerial Departments and agencies sponsored by HM Government"}},{"serial-number":14,"hash":"ac5f75e97b1e254c928c198501b49ceab901fb66","entry":{"fields":["premises","address","start-date","end-date"],"phase":"alpha","register":"premises","registry":"valuation-office-agency","text":"Commercial properties eligable for business rates in England and Wales"}},{"serial-number":13,"hash":"5093cb53ea680811db8a581e195b2d110d1ad134","entry":{"copyright":"Contains National Statistics data Â© [Crown copyright and database right 2013](http://www.nationalarchives.gov.uk/doc/open-government-licence/), Contains Ordnance Survey data Â© [Crown copyright and database right 2013](http://www.ordnancesurvey.co.uk/oswebsite/docs/licences/os-opendata-licence.pdf), Contains Royal Mail data Â© [Royal Mail copyright and database right 2013](http://www.dfpni.gov.uk/lps/index/copyright_licensing_publishing.htm)","fields":["postcode","point"],"phase":"alpha","register":"postcode","registry":"office-for-national-statistics","text":"Postal codes which may appear in a UK address"}},{"serial-number":12,"hash":"daa3c58b45aab258addeb6f4a3abde7a4e090522","entry":{"fields":["location","point"],"phase":"alpha","register":"location","registry":"cabinet-office","text":"Geographic locations of places found in government data which may be published under an open government licence"}},{"serial-number":11,"hash":"a3ffa841bf05ca17c5daad6c6386a9feef134d53","entry":{"fields":["local-authority","name","website","email","address","start-date","end-date"],"phase":"alpha","register":"local-authority","registry":"department-for-communities-and-local-government","text":"Local authorities in England"}},{"serial-number":10,"hash":"688d38ec38e1546936c893ead2b862b8447736ed","entry":{"fields":["industry","name","start-date","end-date"],"phase":"alpha","register":"industry","registry":"office-for-national-statistics","text":"Standard Industry Codes (SIC) used to classify business establishments and other standard units by the type of economic activity in which they are engaged"}},{"serial-number":9,"hash":"464f4889f731a40ab1769a396b570ffa3ec0d74c","entry":{"fields":["government-domain","owner","end-date"],"phase":"alpha","register":"government-domain","registry":"government-digital-service","text":"Internet domain names used by HM Government"}},{"serial-number":7,"hash":"8425ee369e87e8dbeb217af0d7217251ba32ab1c","entry":{"fields":["food-premises-type","name"],"phase":"alpha","register":"food-premises-type","registry":"food-standards-agency","text":"Types of premises which prepare and serve food"}},{"serial-number":6,"hash":"9db376033a0136dac33746cc30154978e5496828","entry":{"fields":["food-premises-rating","food-premises","food-premises-rating-value","food-premises-rating-hygiene-score","food-premises-rating-structural-score","food-premises-rating-confidence-in-management-score","local-authority","food-premises-rating-reply","start-date","inspector","end-date"],"phase":"alpha","register":"food-premises-rating","registry":"food-standards-agency","text":"Food hygiene inspection ratings"}},{"serial-number":5,"hash":"572bef0ffc666e39421fda821e2f899bb4061dd7","entry":{"fields":["field","datatype","phase","register","cardinality","text"],"phase":"alpha","register":"field","registry":"cabinet-office","text":"Field names which may appear in a register"}},{"serial-number":4,"hash":"ab933e49accfac1bf4b57752bcce5843e54f5f44","entry":{"fields":["datatype","phase","text"],"phase":"alpha","register":"datatype","registry":"cabinet-office","text":"Datatypes constraining values used by register fields and idenitifying ways in which it may be encoded a representation"}},{"serial-number":3,"hash":"92fdfdad3ffa376074d07ae27344bba7ba3f730a","entry":{"fields":["country","name","official-name","citizen-names","start-date","end-date","text"],"phase":"alpha","register":"country","registry":"foreign-commonwealth-office","text":"Countries of the world recognised by the UK"}},{"serial-number":2,"hash":"7bfde48aa3d06c682dbfe251ae2e1bf4c5415133","entry":{"fields":["company","name","company-status","registered-office","industry","start-date","end-date"],"phase":"alpha","register":"company","registry":"companies-house","text":"Companies in England and Wales"}},{"serial-number":1,"hash":"d7863fe1f7237401b12b84a61aaab46b74f26ed8","entry":{"copyright":"Contains Ordnance Survey data Â© Crown copyright & database right 2015 Contains Royal Mail data Â© Royal Mail copyright & database right 2015","fields":["address","property","street","locality","town","area","postcode","country"],"phase":"alpha","register":"address","registry":"office-for-national-statistics","text":"Postal addresses in the UK"}}]);

  console.log("get", url);

  return http.get(url, function(response) {
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
