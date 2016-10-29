'use strict';

var Game = require('./game');
var Gallery = require('./gallery');
var form = require('./form');
var reviews = require('./reviews');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var pictures = document.querySelectorAll('.photogallery-image');

var picturesList = [];
for (var i = 0; i < pictures.length; i++) {
  picturesList[i] = pictures[i].childNodes[0].src;
}

var gallery = new Gallery(picturesList);

pictures.forEach(function(picture, pictureNum) {
  picture.onclick = function() {
    gallery.show(pictureNum);
  };
});

var formOpenButton = document.querySelector('.reviews-controls-new');

/** @param {MouseEvent} evt */
formOpenButton.onclick = function(evt) {
  evt.preventDefault();

  form.open(function() {
    game.setGameStatus(Game.Verdict.PAUSE);
    game.setDeactivated(true);
  });
};

form.onClose = function() {
  game.setDeactivated(false);
};

reviews.load();
