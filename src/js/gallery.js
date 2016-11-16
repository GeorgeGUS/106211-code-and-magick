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
  this.currentPicture = document.querySelector('.preview-number-current');
  this.totalPuctures = document.querySelector('.preview-number-total');
  this.galleryClose = document.querySelector('.overlay-gallery-close');
  this.controlLeft = document.querySelector('.overlay-gallery-control-left');
  this.controlRight = document.querySelector('.overlay-gallery-control-right');

  this.pictures = picturesList;
  this.activePicture = 0;
  this.totalPuctures.innerText = this.pictures.length;

  this.hide = this.hide.bind(this);
  this.onLeftClick = this.onLeftClick.bind(this);
  this.onRightClick = this.onRightClick.bind(this);
  this._reloadHash = this._reloadHash.bind(this);
  this.onHashChange = this.onHashChange.bind(this);

  window.addEventListener('hashchange', this.onHashChange);
};

utils.inherit(Gallery, BaseComponent);

Gallery.prototype = {

  onHashChange: function() {
    if (location.hash.indexOf('photo') === -1) {
      this.hide();
    } else {
      this.show(location.hash.match(/#photo\/(\S+)/)[1]);
    }
  },
  /**
   * Вывод на экран блока галереи, добавление обработчиков событий
   * и устанавка текущей выбранной картинки
   * @param {number} pictureNum
   */
  show: function(pictureNum) {
    if (typeof pictureNum === 'number') {
      this.activePicture = pictureNum;
    } else if (typeof pictureNum === 'string') {
      this.pictureSrc = '/' + pictureNum;
      this.activePicture = Array.prototype.indexOf.call(this.pictures, this.pictureSrc) + 1;
    }

    this.element.classList.remove(CLASS_INVISIBLE);

    this.galleryClose.addEventListener('click', this.hide);
    this.controlLeft.addEventListener('click', this.onLeftClick);
    this.controlRight.addEventListener('click', this.onRightClick);

    this._reloadHash();
  },

  /**
   * Скрытие блока галереи и удаление обработчиков событий
   */
  hide: function() {
    location.hash = '';
    this.element.classList.add(CLASS_INVISIBLE);
    this.galleryClose.removeEventListener('click', this.hide);
    this.controlLeft.removeEventListener('click', this.onLeftClick);
    this.controlRight.removeEventListener('click', this.onRightClick);
  },

  onLeftClick: function() {
    if (this.activePicture > 1) {
      this.activePicture--;
      this._reloadHash();
    }
  },

  onRightClick: function() {
    if (this.activePicture < this.pictures.length) {
      this.activePicture++;
      this._reloadHash();
    }
  },

  /**
   * Обновление хэша и возврат из него адреса картинки
   */
  _reloadHash: function() {
    this.pictureSrc = this.pictures[this.activePicture - 1];
    location.hash = '#photo' + this.pictureSrc;
    this.setActivePicture();
  },

  /**
   * Вывод текущей картинки и её номера на экран
   */
  setActivePicture: function() {
    var galleryPreview = document.querySelector('.overlay-gallery-preview');

    var image = new Image();
    if (typeof this.pictureSrc === 'string') {
      image.src = this.pictureSrc;
      this.currentPicture.innerText = this.activePicture;

    } else if (typeof this.activePicture === 'number') {
      image.src = this.pictures[this.activePicture];
      this.currentPicture.innerText = this.activePicture + 1;
    }

    if (galleryPreview.lastElementChild.nodeName === 'IMG') {
      galleryPreview.replaceChild(image, galleryPreview.lastElementChild);
    } else {
      galleryPreview.appendChild(image);
    }
  }
};

module.exports = Gallery;
