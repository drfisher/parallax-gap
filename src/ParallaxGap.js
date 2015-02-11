/**
 * Parallax gap tool
 */
(function (window) {
  'use strict';

  /**
   * @property {string} cssSelectors.layer  All parallax layers
   * @property {string} cssSelectors.baseLayer  One or more main layers
   * @property {string} cssSelectors.scrollCont
   */
  var defaultOptions = {
    cssSelectors: {
      layer: '',
      baseLayer: '', // TODO: is this selector realy needed?
      scrollCont: ''
    }
  };

  /**
   * Standart initialization for modern browsers
   */
  // var initViaNativeScroll = function () {};

  /**
   * Fallback for browsers that don't support perspective
   */
  // var initViaLayerProperties = function () {};

  /**
   * @constructor
   * @param {HTMLElement} container
   * @param {object} options
   */
  var ParallaxGap = function (container, options) {
    this._elements = {
      container: container
    };
    this._options = options;
  };

  ParallaxGap.prototype.init = function () {
    // TODO: find all elements
    // TODO: add event listeners for custom and standart events
  };

  /*
   * Public interface
   */
  if (!(ParallaxGap in window)) {
    window.ParallaxGap = (function () {
      var useParamsCache = false;
      var paramsCache = null;

      /**
       * Merges default options with user's params
       * @param {object} [userParams]
       * @param {object} [defaultParams]
       * @return {object}
       */
      var mergeParams = function (userParams, defaultParams) {
        userParams = userParams || {};
        defaultParams = defaultParams || defaultOptions;
        var result = {};
        var currentValue, currentValueType;

        for (var propName in defaultParams) {
          if (defaultParams.hasOwnProperty(propName)) {
            currentValue = userParams[propName] || defaultParams[propName];
            currentValueType = getTypeOf(currentValue);
            result[propName] = currentValueType === 'array' || currentValueType === 'object' ?
              mergeParams(userParams[propName], defaultParams[propName])
              : currentValue;
          }
        }
        return result;
      };

      /**
       * Inits one container
       * @param {HTMLElement} container
       * @param {object} [params]
       */
      var initContainer = function (container, params) {
        if (useParamsCache && !paramsCache) {
          paramsCache = mergeParams(params);
        }
        // TODO: check for containter, it mast be a HTMLElement
        return new ParallaxGap(container, useParamsCache ? paramsCache : mergeParams(params));
      };

      return {
        init: initContainer,
        /**
         * Inits an array or array-like list of containers (it could be jQuery collection)
         * @param {*} containersList
         * @param {object} [params] Common params for all elements
         * @returns {*} list
         */
        initAll: function (containersList, params) {
          useParamsCache = true;
          Array.prototype.forEach.call(containersList, function (currentContainer) {
            initContainer(currentContainer, params);
          });
          useParamsCache = false;
          paramsCache = null;
          return containersList;
        }
      };
    })();
  }

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
})(window);
