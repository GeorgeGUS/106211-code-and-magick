'use strict';

/**
 * Загрузка списка отзывов с сервера
 * @param {String} url
 * @param {Function} callback
 * @param {String} callbackName
 */
module.exports = function (url, callback, callbackName) {
  var script = document.createElement('script');

  if (callbackName === undefined) {
    callbackName = '__getCallback';
  }
  window[callbackName] = callback;
  script.src = url + '?callback=' + callbackName;
  document.body.appendChild(script);
};

