'use strict';
/**
 * @const
 * @type {string}
 */
var CLASS_INVISIBLE = 'invisible';

/**
 * Конструктор объекта Gallery. Создает объект галереи и выводит экран галереи.
 * @param {NodeList} picturesList
 * @constructor
 */
var Gallery = function(picturesList) {
  this.pictures = picturesList;
  this.activePicture = 0;
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPuctures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');

  this.totalPuctures.innerText = this.pictures.length;
};

Gallery.prototype = {
  /**
   * Выводит на экран блок галереи, добавляет обработчики событий
   * и устанавливает выбранную картинку текущей
   * @param {number} pictureNum
   */
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

  /**
   * Скрывает блок галереи и удаляет обработчики событий
   */
  hide: function() {
    this.galleryContainer.classList.add(CLASS_INVISIBLE);
    this.galleryClose.onclick = null;
    this.controlLeft.onclick = null;
    this.controlRight.onclick = null;
  },

  /**
   * Определяет текущую картинку и её номер
   * и выводит их на экран в соответствующие DOM-элементы
   * @param {number} pictureNum
   */
  setActivePicture: function(pictureNum) {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    this.activePicture = pictureNum; //записываем номер активной картинки

    this.pictures.forEach(function(picture, i) {
      if (i === pictureNum) {
        var image = new Image();
        image.src = picture.childNodes[0].src;

        //проверяем, есть ли картинка в галерее
        if (galleryPreview.lastElementChild.nodeName === 'IMG') {
          galleryPreview.replaceChild(image, galleryPreview.lastElementChild); //если есть, заменяем новой
        } else {
          galleryPreview.appendChild(image); //если нет, добавляем
        }
      }
    });

    this.currentPicture.innerText = this.activePicture + 1; //выводим номер текущей картинки
  }
};

module.exports = Gallery;
