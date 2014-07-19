/*global describe:false, it:false, before:false, after:false, beforeEach:false, afterEach:false*/

'use strict';

var kraken = require('kraken-js');
var express = require('express');
var spec = require('../../lib/spec');

var stubTransport = require('nodemailer-stub-transport');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var mail = null;
var options = {};


describe('Mail lib', function () {
  
  var app;
  
  beforeEach(function (done) {
    app = express();
    app.on('start', done);
    app.use(kraken({
      basedir: process.cwd(),
      onconfig: spec(app).onconfig
    }));
    
    mail = require('../../lib/mail')(stubTransport());
    options = {
      template: 'welcome',
      data: {link: 'http://mytravels.com/confirm?key=738cyjk1098hd143'},
      message: {
        from: 'myTravels <hello@mytravels.com>',
        to: 'user@mytravels.com',
        subject: 'Welcome to myTravels'
      }
    };
  });
  
  it('should send email with template', function () {
    mail.sendEmail(options, app, function (err, info) {
      expect(info.response.toString()).to.have.string('Welcome to myTravels');
    });
  });
  
});