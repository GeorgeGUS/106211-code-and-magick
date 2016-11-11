'use strict';

module.exports = {
  /**
   * Универсальная функция продления цепочки прототипов
   * с помощью создания пустого конструктора
   * @param (Object} childClass
   * @param (Object) parentCLass
   */
  inherit: function(childClass, parentCLass) {
    var emptyConstructor = function() {};
    emptyConstructor.prototype = parentCLass.prototype;

    childClass.prototype = new emptyConstructor();
  },

  /**
   * Универсальная функция для оптимизации функций с заданной задержкой
   * @param (Function) func
   * @param (number) delay
   * @return {Function} wrapper
   */
  throttle: function(func, delay) {
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
  }
};
