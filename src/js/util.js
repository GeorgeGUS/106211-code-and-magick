'use strict';

/**
 * Универсальная функция для оптимизации функций с заданной задержкой
 * @param (Function) func
 * @param (number) delay
 */
module.exports = function(func, delay) {
  var isThrottled = true;

  /** Оболочка для оптимизируемой функции */
  function wrapper() {
    if (isThrottled) {
      func();
      isThrottled = false;
    }
    setTimeout(function() {
      isThrottled = true;
    }, delay);
  }
  return wrapper;
};
