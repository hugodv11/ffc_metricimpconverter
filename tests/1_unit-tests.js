const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
  test('convertHandler should correctly read a whole number input', function () {
    assert.isNotNull(convertHandler.getNum('1L'));
  });
  test('convertHandler should correctly read a decimal number input', function () {
    assert.isNotNull(convertHandler.getNum('1.5L'));
  });
  test('convertHandler should correctly read a fractional input', function () {
    assert.isNotNull(convertHandler.getNum('1/2L'));
  });
  test('convertHandler should correctly read a fractional input with a decimal', function () {
    assert.isNotNull(convertHandler.getNum('1.5/2L'));
  });
  test('convertHandler should correctly return an error on a double-fraction', function () {
    assert.isNull(convertHandler.getNum('1.5/2/3L'));
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
    assert.isNotNull(convertHandler.getNum('L'));
  });
  test('convertHandler should correctly read each valid input unit.', function () {
    assert.isNotNull(convertHandler.getUnit('gal'));
    assert.isNotNull(convertHandler.getUnit('L'));
    assert.isNotNull(convertHandler.getUnit('mi'));
    assert.isNotNull(convertHandler.getUnit('km'));
    assert.isNotNull(convertHandler.getUnit('lbs'));
    assert.isNotNull(convertHandler.getUnit('kg'));
  });
  test('convertHandler should correctly return an error for an invalid input unit', function () {
    assert.isNull(convertHandler.getUnit('invalidUnit'));
  });
  test('convertHandler should return the correct return unit for each valid input unit', function () {
    assert.equal('gal', convertHandler.getReturnUnit('L'));
    assert.equal('L', convertHandler.getReturnUnit('gal'));
    assert.equal('mi', convertHandler.getReturnUnit('km'));
    assert.equal('km', convertHandler.getReturnUnit('mi'));
    assert.equal('lbs', convertHandler.getReturnUnit('kg'));
    assert.equal('kg', convertHandler.getReturnUnit('lbs'));
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });
  test('convertHandler should correctly convert gal to L', function () {
    assert.equal(convertHandler.convert(1, 'gal'), (1 * 3.78541).toFixed(5));
  });
  test('convertHandler should correctly convert L to gal', function () {
    assert.equal(convertHandler.convert(1, 'L'), (1 / 3.78541).toFixed(5));
  });
  test('convertHandler should correctly convert mi to km', function () {
    assert.equal(convertHandler.convert(1, 'mi'), (1 * 1.60934).toFixed(5));
  });
  test('convertHandler should correctly convert km to mi', function () {
    assert.equal(convertHandler.convert(1, 'km'), (1 / 1.60934).toFixed(5));
  });
  test('convertHandler should correctly convert lbs to kg', function () {
    assert.equal(convertHandler.convert(1, 'lbs'), (1 * 0.453592).toFixed(5));
  });
  test('convertHandler should correctly convert kg to lbs', function () {
    assert.equal(convertHandler.convert(1, 'kg'), (1 / 0.453592).toFixed(5));
  });
});