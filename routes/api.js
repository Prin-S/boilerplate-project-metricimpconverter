'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;

    // Call each function
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.getreturnNum(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Format output
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.send('invalid number and unit');
    } else if (initNum == 'invalid number') {
      res.send('invalid number');
    } else if (initUnit == 'invalid unit') {
      res.send('invalid unit');
    } else {
      res.json({initNum, initUnit, returnNum, returnUnit, string});
    }
  });

  app.route('/api/convert').get((req, res) => {
    let input = req.body.input;

    // Call each function
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.getreturnNum(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    // Format output
    res.text(string);
    
    // Format output
    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      res.send('invalid number and unit');
    } else if (initNum == 'invalid number') {
      res.send('invalid number');
    } else if (initUnit == 'invalid unit') {
      res.send('invalid unit');
    } else {
      res.json({initNum, initUnit, returnNum, returnUnit, string});
    }
  });
};