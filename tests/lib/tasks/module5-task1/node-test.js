// tests/lib/tasks/module5-task1/node-test.js
var path = require('path');
var fs = require('fs');
var jsdom = require('jsdom').jsdom;
var querystring = require('querystring');

var NodeTestCase = require('../../basic/node-test-case.js')

var require_js = function(moduleName) {
  return require(
    path.resolve(
      path.join('./src/js', moduleName)
    )
  );
};

var indexHtml = `
<html><body>
  <div class='reviews-list'></div>
<template id="review-template" style="display: none">
  <article class="review">
    <img src="" class="review-author" alt="" title="">
    <span class="review-rating"></span>
    <p class="review-text"></p>
  </article>
</template>
</body></html>
`;

var reviewsData =[{
  "author": {
    "name": "Иванов Иван",
    "picture": "img/user-1.jpg"
  },
  "review_usefulness": 10,
  "rating": 2,
  "description": "Плохая игра: слишком сильно затягивает и невозможно оторваться. Я потерял работу, учебу, девушку и дар речи, но продолжаю играть. Это призыв о помощи: спасите."
}, {
  "author": {
    "name": "Ксения Собчак",
    "picture": "img/user-3.png"
  },
  "review_usefulness": 6,
  "rating": 5,
  "description": "Все хорошо, мне нравится."
}, {
  "author": {
    "name": "Ксюша Бородина",
    "picture": "img/user-2.png"
  },
  "review_usefulness": 3,
  "rating": 1,
  "description": "Все плохо, мне не нравится"
}, {
  "author": {
    "name": "Мария Антуанетта",
    "picture": "img/user-1.jpg"
  },
  "review_usefulness": 4,
  "rating": 3,
  "description": "Невероятно чумовая игра. Пендальф-синий — мой герой)))) Он такой милашка. Благодаря ему я наконец нацчилась отвлекаться от работы и учёбы."
}, {
  "author": {
    "name": "Дмитрий Карпов",
    "picture": "img/user-3.png"
  },
  "review_usefulness": 20,
  "rating": 4,
  "description": "Игра очень неплохая. Тут есть и трюки, и взлёты, и падения. Никогда не знаешь, что ждёт тебя впереди."
}];

module.exports = function testModule5Task1() {
  var testCase = new NodeTestCase('module5-task1', {
    title: 'Больше модулей',

    runAsserts: function() {
      this._withJSDOM(this._runLoadAsserts);
      this._withJSDOM(this._runTemplateAsserts);
      this._withJSDOM(this._runReviewsAsserts);
    },

    _runLoadAsserts: function() {
      var testCase = this;

      var load = require_js('load');

      this.addPromise(function(resolve) {
        var stopTimeout = setTimeout(function() {
          testCase.assert(false, 'load: Не удаётся загрузить JSONP');
          resolve();
        }, 1000);

        load('http://localhost:1507/api/reviews', function(data) {

          clearTimeout(stopTimeout);

          testCase.assertEqual(
            data.length, reviewsData.length,
            'load: Данные загружены'
          );

          for(var i = 0; i < Math.min(data.length, reviewsData.length); ++i) {
            testCase.assertEqual(
              data[i].rating, 
              reviewsData[i].rating,
              'load: Сравниваем оценку #' + (i + 1)
            );

            testCase.assertEqual(
              data[i].description, 
              reviewsData[i].description,
              'load: Сравниваем описание #' + (i + 1)
            );
          }

          resolve();
        });
      });
    },

    _withJSDOM: function(cb) {

      var jsdom = require('jsdom');
      var testCase = this;

      jsdom.env({
        html: indexHtml,
        url: 'http://localhost:1507',
        done: function(err, window) {
          var saveDoc = global.document;
          var saveWin = global.window;
          var saveImg = global.Image;

          global.document = window.document;
          global.window = window;
          global.Image = window.Image;

          var result = cb.call(testCase);

          if(result instanceof Promise) {
            result.then(function() {
              global.document = saveDoc;
              global.window = saveWin;
              global.Image = saveImg;
            });
          } else {
            // restore
            global.document = saveDoc;
            global.window = saveWin;
            global.Image = saveImg;
          }
        },
        features: {
          FetchExternalResources: ["script"]
        },
        resourceLoader: function(resource, callback) {
          var pathname = resource.url.pathname;
          var query = resource.url.query;
          var opts = querystring.parse(query);

          if(pathname === '/api/reviews') {
            var cbName = opts.callback;

            callback(null, cbName + '(' + JSON.stringify(reviewsData) + ')');
          } else {
            return resource.defaultFetch(callback);
          }
        }
      });
    },

    _runTemplateAsserts: function() {
      var getTemplateElement = require_js('review');

      var data = {
        "author": {
          "name": "Иванов Иван",
          "picture": "img/user-1.jpg"
        },
        "review_usefulness": 10,
        "rating": 2,
        "description": "Плохая игра: слишком сильно затягивает и невозможно оторваться. Я потерял работу, учебу, девушку и дар речи, но продолжаю играть. Это призыв о помощи: спасите."
      };

      var $el = getTemplateElement(data);

      this.assert(
        $el,
        'review: На выходе должен получиться DOM-узел'
      );



      this.assert(
        function() {
          return ($el.querySelector('.review-rating').classList.contains('review-rating-two'));
        },
        'review: В узел .review-rating должно попасть класс review-rating-two'
      );

      this.assert(
        function() {
          return ($el.querySelector('.review-text').textContent === data.description);
        },
        'review: В узел .review-text должно попасть описание отзыва'
      );
    },

    _runReviewsAsserts: function() {
      var testCase = this;

      require_js('reviews'); // Just load reviews..

      return this.addPromise(function(resolve) {
        setTimeout(function() {
          // Wait until pictures are loaded
          //   and DOM is modified
          var reviewNodes = document.querySelectorAll('.reviews-list > *');

          var rateToClass = function(rate) {
            if(rate > 5) { rate = 5; }
            if(rate < 1) { rate = 1; }

            var rateName = [
              'one', 'two', 'three', 'four', 'five'
            ][rate - 1];

            return 'review-rating-' + rateName;
          };

          testCase.assertEqual(
            reviewNodes.length, reviewsData.length,
            'reviews: Загружены и добавлены все отзывы'
          );

          for(var i = 0; i < Math.min(reviewNodes.length, reviewsData.length); ++i) {
            testCase.assert(
              reviewNodes[i].
                querySelector('.review-rating').classList.
                contains(rateToClass(reviewsData[i].rating)), 
              'reviews: Сравниваем оценку #' + (i + 1)
            );

            testCase.assertEqual(
              reviewNodes[i].querySelector('.review-text').textContent,
              '' + reviewsData[i].description,
              'reviews: Сравниваем описание #' + (i + 1)
            );
          }

          resolve();
        }, 1000);
      });
    }
  });

  return testCase.run();
};