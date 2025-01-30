'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {

    const initNum = convertHandler.getNum(req.query.input);
    const initUnit = convertHandler.getUnit(req.query.input);

    if (!initNum && !initUnit) return res.send('invalid number and unit');
    else if (!initNum) res.send('invalid number');
    else if (!initUnit) res.send('invalid unit');

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spellOutInitUnit = convertHandler.spellOutUnit(initUnit);
    const spellOutReturntUnit = convertHandler.spellOutUnit(returnUnit);

    res.json(
      {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertHandler.getString(initNum, spellOutInitUnit, returnNum, spellOutReturntUnit)
      }
    );
  });
};
