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
 * @param {Node} element
 * @param {Array} data
 * @constructor
 */
var Review = function(element, data) {
  this.data = data;
  BaseComponent.call(this, this.getReviewItem(element));
  this.onAnswerClick = this.onAnswerClick.bind(this);
  this.answersList = this.element.querySelector('.review-quiz');
  this.answers = this.element.querySelectorAll('.review-quiz-answer');

  this.answersList.addEventListener('click', this.onAnswerClick);
};

utils.inherit(Review, BaseComponent);

Review.prototype = {
  /**
   * Отрисивка одного блока отзыва
   * @returns {Node} reviewItem
   */
  getReviewItem: function(reviewItem) {
    var reviewPicture = reviewItem.querySelector('.review-author'),
      reviewText = reviewItem.querySelector('.review-text'),
      ratingClasses = ['one', 'two', 'three', 'four', 'five'],
      authorImage = new Image(124, 124);

    authorImage.onload = function() {
      reviewPicture.src = this.src;
    };
    authorImage.onerror = function() {
      reviewItem.classList.add('review-load-failure');
    };
    authorImage.src = this.data.getAuthorImage();
    reviewText.textContent = this.data.getDescriptionText();
    reviewItem.querySelector('.review-rating').classList.add('review-rating-' +
      ratingClasses[this.data.getRatingValue() - 1]);

    return reviewItem;
  },

  /** @param {Node} evt */
  onAnswerClick: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      Array.prototype.forEach.call(this.answers, function(answer) {
        answer.classList.remove(CLASS_ACTIVE);
      });
      evt.target.classList.add(CLASS_ACTIVE);
    }
  },

  remove: function() {
    this.answersList.removeEventListener('click', this.onAnswerClick);
    BaseComponent.prototype.remove.call(this);
  }
};

module.exports = Review;
