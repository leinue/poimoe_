/**
 * Flip a `transform` function values.
 *
 * @param {String} value
 * @param {String} prop
 * @return {String}
 */

var translate = require('./translate');

/**
 * Map of property values to transform functions
 */

var TRANSFORM = {
    'translate3d': translate,
    'translate': translate
};

module.exports = function (value, prop) {
  var RE_FUNCTION = /([^\s(]+)(\([^)]+)\)/g;
  var RE_FUNCTION_NAME = /^([^\(]+)/g;
    
  var transformCall = value.split(/[\s\t\n]/),
      transformName,
      newValue = '',
      flipFn;

  while( (transformCall = RE_FUNCTION.exec(value)) ) {

    transformName = transformCall[0].match(RE_FUNCTION_NAME);
    // flip function associated to the transformation
    flipFn = TRANSFORM.hasOwnProperty(transformName) ? TRANSFORM[transformName] : false;
    // some don't need to flip params
    newValue += (newValue?' ':'') + (flipFn ? flipFn(transformCall[0]) : transformCall[0]);

  }

  return newValue;
};
