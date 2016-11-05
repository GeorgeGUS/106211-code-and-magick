'use strict';

/**
 * Проеобразование объекта в строку GET-параметров
 * @param {Object} params
 */
var getSearchString = function(params) {
  return Object.keys(params).map(function(param) {
    return [param, params[param]].join('=');
  }).join('&');
};

/**
 * Загрузка списка отзывов с сервера
 * @param {String} url
 * @param {Object} params
 * @param {Function} callback
 */
module.exports = function(url, params, callback) {
  var xhr = new XMLHttpRequest();
  var loadedData = [];

  xhr.open('GET', url + '?' + getSearchString(params));

  xhr.addEventListener('load', function(evt) {
    try {
      loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    } catch(err) {
      console.log(err);
    }
  });

  xhr.send();
};
