const unitTypes = [
  'gal',
  'L',
  'mi',
  'km',
  'lbs',
  'kg'
];

function ConvertHandler() {

  this.getNum = function (input) {
    if (!input) return null;

    const match = input.match(/^([\d/.]*)\s*([a-zA-Z]*)$/);
    if (!match) return null;

    let numStr = match[1];
    if (!numStr) return 1;

    if (numStr.includes('/')) {
      const values = numStr.split('/');
      if (values.length !== 2) return null;

      return parseFloat(values[0]) / parseFloat(values[1]);
    }

    return parseFloat(numStr);
  };

  this.getUnit = function (input) {
    if (!input) return null;

    const match = input.match(/^([\d/.]*)\s*([a-zA-Z]*)$/);
    if (!match) return null;

    let unit = match[2].toLowerCase();

    if (unit === 'l') return 'L';
    if (unitTypes.includes(unit)) return unit;

    return null;
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      default:
        return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
    }

    return Number(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };

}

module.exports = ConvertHandler;
