var expect  = require('chai').expect;
var request = require('supertest');
var server = require('../bin/www');
var app = require('../app');
var agent = request.agent(app);
var mocha = require('mocha');



var base_url = 'http://localhost:3000'

describe("App Server", function() {

  before(function (done) {
    app.on("appStarted", function(){
        done();
    });
  });

  describe("GET /", function() {
    it("returns status code 200", function(done) {
      agent.get('/')
        .expect(200);
      done();
    });
  });

});
