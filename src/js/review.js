'use strict';

var BaseComponent = require('./base-component');
var utils = require('./utils');

/**
 * @const
 * @type {string}
 */
var CLASS_ACTIVE = 'review-quiz-answer-active';


/**
 * Конструктор блока отзыва
 * @param {Array} data
 * @constructor
 */
var Review = function(element, data) {
  this.data = data;
  // this.element = this.getReviewItem();
  BaseComponent.call(this, this.getReviewItem(element));
  this.onAnswerClick = this.onAnswerClick.bind(this);
  this.answers = this.element.querySelectorAll('.review-quiz-answer');

  for (var i = 0; i < this.answers.length; i++) {
    this.answers[i].addEventListener('click', this.onAnswerClick);
  }
};

utils.inherit(Review, BaseComponent);

Review.prototype = {
  /**
   * Отрисивка одного блока отзыва
   * @returns {Node} reviewItem
   */
  getReviewItem: function(template) {
    var reviewItem = template.cloneNode(true),
      reviewContainer = reviewItem.querySelector('.review'),
      reviewPicture = reviewItem.querySelector('.review-author'),
      reviewText = reviewItem.querySelector('.review-text'),
      ratingClasses = ['one', 'two', 'three', 'four', 'five'],
      authorImage = new Image(124, 124);

    authorImage.onload = function() {
      reviewPicture.src = this.src;
    };
    authorImage.onerror = function() {
      reviewContainer.classList.add('review-load-failure');
    };
    authorImage.src = this.data.author.picture;
    reviewText.textContent = this.data.description;
    reviewItem.querySelector('.review-rating').classList.add('review-rating-' + ratingClasses[this.data.rating - 1]);

    return reviewItem;
  },

  /**
   * @param {Node} evt
   */
  onAnswerClick: function(evt) {
    for (var i = 0; i < this.answers.length; i++) {
      this.answers[i].classList.remove(CLASS_ACTIVE);
    }
    evt.target.classList.add(CLASS_ACTIVE);
  },

  remove: function() {
    for (var i = 0; i < this.answers.length; i++) {
      this.answers[i].removeEventListener('click', this.onAnswerClick);
    }
    BaseComponent.prototype.remove.call(this);
  }
};

module.exports = Review;
