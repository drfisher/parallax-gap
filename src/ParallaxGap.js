/**
 * Parallax gap tool
 */
(function (window) {
  'use strict';

  var parallaxGapNameSpace = window.ParallaxGap;
  var tools = parallaxGapNameSpace._tools;
  var useParamsCache = false;
  var paramsCache = null;

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

  /**
   * Inits an HTMLElement or an array or an array-like list of containers (it could be jQuery collection)
   * @param {*} targetElements
   * @param {object} [params] Common params for all elements
   * @returns {*} ParallaxGap instance or list of elements
   */
  parallaxGapNameSpace.init = function (targetElements, params) {
    if (targetElements.tagName) {
      // Single element
      return initContainer(targetElements, params);
    } else {
      // List of elements
      useParamsCache = true;
      Array.prototype.forEach.call(targetElements, function (currentContainer) {
        initContainer(currentContainer, params);
      });
      useParamsCache = false;
      paramsCache = null;
    }
    return targetElements;
  };

  /**
   * Inits one container
   * @param {HTMLElement} container
   * @param {object} [params]
   */
  function initContainer (container, params) {
    if (useParamsCache && !paramsCache) {
      paramsCache = mergeParams(params);
    }
    // TODO: check for containter, it mast be a HTMLElement
    return new ParallaxGap(container, useParamsCache ? paramsCache : mergeParams(params));
  }

  /**
   * Merges default options with user's params
   * @param {object} [userParams]
   * @param {object} [defaultParams]
   * @return {object}
   */
  function mergeParams (userParams, defaultParams) {
    userParams = userParams || {};
    defaultParams = defaultParams || defaultOptions;
    var result = {};
    var currentValue, currentValueType;

    for (var propName in defaultParams) {
      if (defaultParams.hasOwnProperty(propName)) {
        currentValue = userParams[propName] || defaultParams[propName];
        currentValueType = tools.getTypeOf(currentValue);
        result[propName] = currentValueType === 'array' || currentValueType === 'object' ?
          mergeParams(userParams[propName], defaultParams[propName])
          : currentValue;
      }
    }
    return result;
  }
})(window);
