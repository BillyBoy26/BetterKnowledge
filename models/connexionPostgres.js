var pg = require('pg');
var config = require('../configuration/configPostgres');


var query =  function(text, values, callback) {
    pg.connect(config.conString,function(err, client, done) {
        client.query(text, values, function(err, result) {
            done();
            callback(err, result.rows,result.fields,result.rowCount);
        })
    });
}

module.exports = query;