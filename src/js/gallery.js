'use strict';

const CLASS_INVISIBLE = 'invisible';

var Gallery = function() {
  this.pictures = document.querySelectorAll('.photogallery-image img');
  this.activePicture = 0;
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPuctures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
};

Gallery.prototype = {
  show: function(pictureNum) {
    var self = this;
    this.galleryClose.onclick = self.hide;

    this.galleryContainer.classList.remove(CLASS_INVISIBLE);

    this.setActivePicture(pictureNum);
  },

  hide: function() {
    this.galleryContainer.classList.add(CLASS_INVISIBLE);
    this.galleryClose = null;
  },

  setActivePicture: function(pictureNum) {
    var self = this,
      galleryPreview = document.querySelector('.overlay-gallery-preview');

    self.activePicture = pictureNum;
    this.pictures.forEach(function(picture, i) {
      if (i === self.activePicture) {
        var image = new Image();
        image.src = picture.src;
        galleryPreview.appendChild(image);
      }
    });
  }
};

module.exports = Gallery;
