
var pg = require('pg');
var config = require('../configuration/configPostgres')
var client = new pg.Client(config.conString);
module.exports = client;