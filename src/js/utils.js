'use strict';

module.exports = {
  /**
   * Универсальная функция продления цепочки прототипов
   * с помощью создания пустого конструктора
   * @param (Object} ChildClass
   * @param (Object) ParentClass
   */
  inherit: function(ChildClass, ParentClass) {
    if (typeof ChildClass === 'function' && typeof ParentClass === 'function') {
      var EmptyConstructor = function() {};
      EmptyConstructor.prototype = ParentClass.prototype;

      ChildClass.prototype = new EmptyConstructor();
    } else {
      console.error('inherit: One or both parameters is not a function');
    }

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
