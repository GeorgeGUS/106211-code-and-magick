'use strict';

var Game = require('./game');
var Gallery = require('./gallery');
var form = require('./form');
var reviews = require('./reviews');

var game = new Game(document.querySelector('.demo'));
game.initializeLevelAndStart();
game.setGameStatus(Game.Verdict.INTRO);

var pictures = document.querySelectorAll('.photogallery-image');

var picturesList = Array.prototype.map.call(pictures, function(picUrl) {
  var pictureUrl = document.createElement('a');
  pictureUrl.href = picUrl.childNodes[0].src;
  return pictureUrl.pathname;
});


var galleryContainer = document.querySelector('.overlay-gallery');
var gallery = new Gallery(galleryContainer, picturesList);

Array.prototype.forEach.call(pictures, function(picture, pictureNum) {
  picture.onclick = function() {
    location.hash = '#photo' + picturesList[pictureNum];
    gallery.show(location.hash);
  };
});

window.onload = gallery.onHashChange;

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
