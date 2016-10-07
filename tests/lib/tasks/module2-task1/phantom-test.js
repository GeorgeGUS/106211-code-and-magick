// tests/lib/tasks/module2-task1/phantom-test.js
'use strict';

var humgat = require('../../humgat').create();
require('../../humgat/common')(humgat);

humgat.on('page.open.success', function() {
  this.title = 'Canvas';

  var page = this.getPage();

  var phantomResults = page.evaluate(function() {
    var Game = window.Game;
    var game = new Game(document.querySelector('.demo'));

    var results = {
      useConsole: false,
      drawingPath: false,
      drawingRect: false,
      drawingText: false
    };

    // Mock to replace real ctx
    var ctx = {
      beginPath: function() {
        results.drawingPath = true;
      },
      closePath: function() {
        results.drawingPath = true;
      },
      lineTo: function() {
        results.drawingPath = true;
      },
      fill: function() {
        results.drawingPath = true;
      },
      stroke: function() {},

      fillRect: function() {
        results.drawingRect = true;
      },
      strokeRect: function() {
        results.drawingRect = true;
      },

      fillText: function() {
        results.drawingText = true;
      },
      strokeText: function() {
        results.drawingText = true;
      }
    };

    // Mock to replace console.window
    var con = {
      log: function() {
        results.logUsed = true;
      }
    };

    // Отобразим «выигрыш»
    if(!game.state) {
      game.state = {};
    }
    game.state.currentStatus = 1;

    window.console = con;
    game.ctx = ctx;

    try {
      // Вдруг будет использован непредусмотренный метод?
      game._drawPauseScreen();
    } catch(err) {
      results.noErrors = false;
    }

    return results;
  });

  this.assert(
    !phantomResults.logUsed,
    'Не должнен использоваться метод console.log'
  );

  this.assert(
    phantomResults.drawingPath || phantomResults.drawingRect,
    'Должны быть использованы методы для рисования path или прямоугольника'
  );

  this.assert(
    phantomResults.drawingText,
    'Должны быть использованы методы для отображения текста'
  );

  this.emit('suite.done');
}).run();
