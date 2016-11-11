'use strict';

module.exports = {
  /**
   * Универсальная функция копирования классов с помощью создания
   * пустого прототипа объекта
   * @param (Object) ClassOrigin
   * @return (Object) ClassCopy
   */
  inherit: function(ClassOrigin) {
    var ClassCopy = function() {};
    ClassCopy.prototype = ClassOrigin.prototype;

    return new ClassCopy();
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
