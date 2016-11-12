'use strict';

var BaseComponent = require('./base-component');
var utils = require('./utils');

/**
 * @const
 * @type {string}
 */
var CLASS_INVISIBLE = 'invisible';

/**
 * Конструктор объекта Gallery. Создает объект галереи и выводит экран галереи.
 * @param {Node} container
 * @param {NodeList} picturesList
 * @constructor
 */
var Gallery = function(container, picturesList) {
  BaseComponent.call(this, container);
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPuctures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');


  this.pictures = picturesList;
  this.activePicture = 0;
  this.totalPuctures.innerText = this.pictures.length;

  this.hide = this.hide.bind(this);
  this.onLeftClick = this.onLeftClick.bind(this);
  this.onRightClick = this.onRightClick.bind(this);
};

// utils.inherit(Gallery, BaseComponent); //правильный вариант
utils.inherit(CLASS_INVISIBLE, CLASS_INVISIBLE); // вариант с ошибкой.
// ошибка выводится в консоль, но наследование продолжает работать.


Gallery.prototype = {
  /**
   * Вывод на экран блока галереи, добавление обработчиков событий
   * и устанавка текущей выбранной картинки
   * @param {number} pictureNum
   */
  show: function(pictureNum) {
    this.activePicture = pictureNum;
    this.element.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.onLeftClick);
    this.controlRight.addEventListener('click', this.onRightClick);

    this.setActivePicture();
  },

  /**
   * Скрытие блока галереи и удаление обработчиков событий
   */
  hide: function() {
    this.element.classList.add(CLASS_INVISIBLE);
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.onLeftClick);
    this.controlRight.removeEventListener('click', this.onRightClick);
  },

  onLeftClick: function() {
    if (this.activePicture > 0) {
      this.activePicture--;
      this.setActivePicture();
    }
  },

  onRightClick: function() {
    if (this.activePicture < this.pictures.length - 1) {
      this.activePicture++;
      this.setActivePicture();
    }
  },

  /**
   * Вывод текущей картинки и её номера на экран
   */
  setActivePicture: function() {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    var image = new Image();
    image.src = this.pictures[this.activePicture];

    if (galleryPreview.lastElementChild.nodeName === 'IMG') {
      galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
    } else {
      galleryPreview.appendChild(image);
    }

    this.currentPicture.innerText = this.activePicture + 1;
  }
};

module.exports = Gallery;
