// tests/lib/tasks/module1-task2/node-test.js
var path = require('path');
var fs = require('fs');

var NodeTestCase = require('../../basic/node-test-case.js')

var testModule1Task2 = module.exports = function() {
  var testCase = new NodeTestCase('module1-task2', {
    title: 'Начинаем программировать',
    runAsserts: function() {
      var getMessage = this._getMessage();

      this.fatalAssert(
        'function' === typeof (getMessage),
        'Функция getMessage должна быть определена'
      );

      this.assertEqual(
        'Я попал в дерево',
        getMessage(true, 'дерево'),
        'Результат при a === true'
      );

      this.assertEqual(
        'Я никуда не попал',
        getMessage(false),
        'Результат при a === false'
      );

      this.assertEqual(
        'Я прыгнул на 3800 сантиметров',
        getMessage(38, 8),
        'Результат, если a - число'
      );

      this.assertEqual(
        'Я прошёл 15 шагов',
        getMessage([1, 2, 3, 4, 5]),
        'Результат, если a - массив'
      );

      this.assertEqual(
        'Я прошёл 30 метров',
        getMessage([1, 2, 3, 4, 5], [2, 2, 2, 2, 2]),
        'Результат, если a и b - массивы'
      );
    },

    _getMessage: function() {
      var checkJSPath = path.resolve('./src/js/check.js');
      var text;
      var fn = null;

      this.fatalAssert(
        function() {
          return fs.statSync(checkJSPath).isFile();
        },
        'Файл check.js должен быть создан в каталоге src/js'
      );

      text = fs.readFileSync(checkJSPath, 'utf-8');

      // Избавляемся от "use strict", заменяем пробелы на "·"
      text = text.replace(/use\s+strict/, 'use\xC2\xB7strict');

      // Eval в анонимном контексте
      fn = (function() {
        var window = {};
        eval(text);

        if(typeof (getMessage) === 'undefined') {
          return window.getMessage;
        } else {
          return getMessage;
        }
      })();

      return fn;
    }
  });

  return testCase.run();
};
