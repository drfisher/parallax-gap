/**
 * Parallax gap tool
 */
(function (window) {
	'use strict';

	/**
	 * @property {string} cssSelectors.layer
	 * @property {string} cssSelectors.baseLayer
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
	 * @constructor
	 */
	var ParallaxGap = function () {};

	ParallaxGap.prototype.init = function () {};

	/*
	 * Public interface
	 */
	if (!(ParallaxGap in window)) {
		window.ParallaxGap = (function () {
			var useParamsCache = false;
			var paramsCache = null;

			/**
			 * Merges default options with user's params
			 * @param {object} [params]
			 * @return {object}
			 */
			var merge = function (params) {
				params = params || {};
				// TODO: merge
			};

			/**
			 * Inits one container
			 * @param {HTMLElement} container
			 * @param {object} [params]
			 */
			var initContainer = function (container, params) {
				if (useParamsCache && !paramsCache) {
					paramsCache = merge(params);
				}
				// TODO: check for containter, it mast be a HTMLElement
				return new ParallaxGap(container, useParamsCache ? paramsCache : merge(params));
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
})(window);
