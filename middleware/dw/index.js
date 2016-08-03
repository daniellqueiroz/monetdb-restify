

'use strict';


/**
 * Module dependencies.
 */

var _ = require('lodash');
var path = require('path');
var MonetDBInterface = require(path.join(__dirname, '..', '..', 'helpers', 'monetdb-interface.js'));


/**
 * Routes
 */

var routes = [];

/**
 * MonetDB
 */

var dbInterface = new MonetDBInterface();


/**
 * GET /dw/fact/:id
 * Version: 1.0.0
 */


routes.push({
  meta: {
    name: 'getrows',
    method: 'GET',
    paths: [
      '/dw/:id'
    ],
    version: '1.0.0'
  },
  middleware: function(req, res, next) {

    var table = req.params.id;
    
    switch(table) {

      case 'all':

          var query = 'SELECT name from sys.tables ' +
                      'WHERE system = false AND schema_id = 40791';

          dbInterface.executeQuery(query).then(function (result) {
            res.send(result.data);
          }, function (err) {
            res.status(500).send(err);
          });
          
          break;

      default:
        
        if (req.query.columns) {
          var columns = req.query.columns.split(',')
        }
        dbInterface.select('dw', table, {
            columns : columns,
            filter  : req.query
          }).then(function(result) {
          var resultset = result.data;
          res.send(resultset);
        }, function(err) {
          res.status(500).send(err);
        });
        
        break;
    }

    return next();
  }

});

/**
 * Export
 */

module.exports = routes;

