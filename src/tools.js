/**
 * Some helpers
 * @author Pavel Rybin
 */
(function (window) {
  'use strict';

  var userAgent = navigator.userAgent.toLowerCase();
  var detectDeviceTypePromise;

  /**
   * All helpfull data about user's device
   */
  var device = {
    touch: '',
    type: ''
  };

  /**
   * A slightly more informative "typeof"
   * @param {*} testedValue
   * @returns {string}
   */
  function getTypeOf (testedValue) {
    return testedValue === null ? 'null'
      : Array.isArray(testedValue) ? 'array'
      : typeof testedValue;
  }

  /**
   * Checks device type
   * @returns {Promise}
   */
  // function checkDeviceType () {
  //   return detectDeviceTypePromise || (detectDeviceTypePromise = new Promise(function (resolve) {
  //       if (device.touch) {
  //         if (userAgent.indexOf('ipad') > -1 || userAgent.indexOf('iphone') > -1) {
  //           saveDeviceType('tablet', resolve);
  //         } else {
  //           $(window).one('mouseover mouseout', function (oEvent) {
  //             if (oEvent.fromElement || oEvent.relatedTarget) {
  //               saveDeviceType('laptop', resolve);
  //             }
  //           });
  //         }
  //       } else {
  //         device.type = 'laptop';
  //         resolve();
  //       }
  //     }));
  // }

  if (!('ParallaxGap' in window)) {
    window.ParallaxGap = {};
  }
  window.ParallaxGap._tools = {
    getTypeOf: getTypeOf
    // checkDeviceType: checkDeviceType
  };
  window.ParallaxGap._device = device;
})(window);
