function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.split(/[a-zA-Z]/)[0];

    if (!result) {
      // If no number is inputted
      result = 1;
    } else if (result.match(/\//g) && result.match(/\//g).length >= 2) {
      // If number contains more than 1 '/'
      result = 'invalid number';
    } else if (result.match('/')) {
      // If number contains 1 '/', convert string to float
      let splitted = result.split('/');
      result = parseFloat(splitted[0]) / parseFloat(splitted[1]);
    } else {
      // Else convert string to float
      result = parseFloat(result);
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let numToCut = input.split(/[a-zA-Z]/)[0].length;
    let result = input.slice(numToCut);

    if (result == 'L' || result == 'l') { 
      // Always output 'L'
      result = result.toUpperCase();
    } else {
      result = result.toLowerCase();
    }

    switch (result) {
      // For the 6 valid units
      case 'gal':
      case 'L':
      case 'mi':
      case 'km':
      case 'lbs':
      case 'kg':
        break;
      default:
        // For other units
        result = 'invalid unit';
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    
    // Convert units
    initUnit == 'gal' ? result = 'L'
    : initUnit == 'L' ? result = 'gal'
    : initUnit == 'mi' ? result = 'km'
    : initUnit == 'km' ? result = 'mi'
    : initUnit == 'lbs' ? result = 'kg'
    : initUnit == 'kg' ? result = 'lbs'
    : result == 'invalid unit';

    return result;
  };

  this.spellOutUnit = function(returnUnit) {
    let result;
    
    // Spell out units
    returnUnit == 'gal' ? result = 'gallons'
    : returnUnit == 'L' ? result = 'liters'
    : returnUnit == 'mi' ? result = 'miles'
    : returnUnit == 'km' ? result = 'kilometers'
    : returnUnit == 'lbs' ? result = 'pounds'
    : returnUnit == 'kg' ? result = 'kilograms'
    : result == 'invalid unit';

    return result;
  };
  
  this.getreturnNum = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    // Convert values
    initUnit == 'gal' ? result = parseFloat((initNum * galToL).toFixed(5))
    : initUnit == 'L' ? result = parseFloat((initNum / galToL).toFixed(5))
    : initUnit == 'mi' ? result = parseFloat((initNum * miToKm).toFixed(5))
    : initUnit == 'km' ? result = parseFloat((initNum / miToKm).toFixed(5))
    : initUnit == 'lbs' ? result = parseFloat((initNum * lbsToKg).toFixed(5))
    : initUnit == 'kg' ? result = parseFloat((initNum / lbsToKg).toFixed(5))
    : result == 'invalid unit';

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    // Call spellOutUnit() to convert units to full names
    let spellOutInitUnit = this.spellOutUnit(initUnit);
    let spellOutReturnUnit = this.spellOutUnit(returnUnit);
    let result;

    if (initNum == 'invalid number' && initUnit == 'invalid unit') {
      result = 'invalid number and unit';
    } else if (initNum == 'invalid number') {
      result = 'invalid number';
    } else if (initUnit == 'invalid unit') {
      result = 'invalid unit';
    } else {
      result = `${initNum} ${spellOutInitUnit} converts to ${returnNum} ${spellOutReturnUnit}`;
    }

    return result;
  };
  
}

module.exports = ConvertHandler;
