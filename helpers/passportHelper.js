'use strict';  

/**
 * Module dependencies.
 */

var passport = require('passport-restify')
  , LocalStrategy = require('passport-local').Strategy;

/**
 * passport
 */

function PassportInterface(){

}


function find_user(user, password){

}


PassportInterface.prototype.auth_request = function(request) {
    var _user = request.user.id;
    var _pass = request.user.username;



    return conn.query(query, options);
};


module.exports = PassportInterface;

