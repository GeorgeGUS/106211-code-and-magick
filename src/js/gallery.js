'use strict';

var CLASS_INVISIBLE = 'invisible';

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

    this.galleryContainer.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.onclick = function() {
      self.hide();
    };
    this.controlLeft.onclick = function() {
      if (pictureNum > 0) {
        pictureNum--;
        self.setActivePicture(pictureNum);
      }
    };
    this.controlRight.onclick = function() {
      if (pictureNum < self.pictures.length - 1) {
        pictureNum++;
        self.setActivePicture(pictureNum);
      }
    };

    this.setActivePicture(pictureNum);
  },

  hide: function() {
    this.galleryContainer.classList.add(CLASS_INVISIBLE);
    //удаляем обработчики событий
    this.galleryClose.onclick = null;
    this.controlLeft.onclick = null;
    this.controlRight.onclick = null;
  },

  setActivePicture: function(pictureNum) {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    this.activePicture = pictureNum; //записываем номер активной картинки

    this.pictures.forEach(function(picture, i) {
      if (i === pictureNum) {
        var image = new Image();
        image.src = picture.src;
        //проверяем, есть ли картинка в галерее
        if (galleryPreview.lastElementChild.nodeName === 'IMG') {
          galleryPreview.replaceChild(image, galleryPreview.lastElementChild); //если есть, заменяем новой
        } else {
          galleryPreview.appendChild(image); //если нет, добавляем
        }
      }

    });

    this.currentPicture.innerText = this.activePicture + 1; //выводим номер текущей картинки
    this.totalPuctures.innerText = this.pictures.length;
  }
};

module.exports = Gallery;
