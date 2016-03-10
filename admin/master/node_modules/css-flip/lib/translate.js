/**
 * Flip a `translate` and `translate3d` X argument.
 *
 * @param {String} value Value
 * @return {String}
 */

module.exports = function (value) {
  var RE_TRANSLATE = /([\w+]+\()([^,]+)(.*)/g;

  return value.replace(RE_TRANSLATE, function(m, p1, p2, p3) {
    p2 = p2.trim();
    switch( p2[0] ) {
      case '-': p2 = p2.replace('-',''); break;
      case '+': p2 = p2.replace('+','-'); break;
      default:  p2 = '-' + p2;
    }
    return p1 + p2 + p3;
  });
};
