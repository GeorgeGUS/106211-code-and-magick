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
  this.setUsefulnessOnClick = this.setUsefulnessOnClick.bind(this);
  this.answersList = this.element.querySelector('.review-quiz');
  this.answerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.answerNo = this.element.querySelector('.review-quiz-answer-no');

  this.answersList.addEventListener('click', this.setUsefulnessOnClick);
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
    authorImage.src = this.data.getAuthorPicture();
    reviewText.textContent = this.data.getDescription();
    reviewItem.querySelector('.review-rating').classList.add('review-rating-' +
      ratingClasses[this.data.getRating() - 1]);

    return reviewItem;
  },

  /**
   * Установка значения полезности отзыва и запись в объект
   * @param {Node} evt
   */
  setUsefulnessOnClick: function(evt) {
    if (evt.target.classList.contains('review-quiz-answer')) {
      var isUseful = evt.target === this.answerYes;
      this.data.updateUsefulness(isUseful, this.setUsefulnessState.bind(this));
    }
  },

  /** @param {Node} isUseful */
  setUsefulnessState: function(isUseful) {
    if (isUseful) {
      this.answerYes.classList.add(CLASS_ACTIVE);
      this.answerNo.classList.remove(CLASS_ACTIVE);
    } else {
      this.answerNo.classList.add(CLASS_ACTIVE);
      this.answerYes.classList.remove(CLASS_ACTIVE);
    }
  },

  remove: function() {
    this.answersList.removeEventListener('click', this.onAnswerClick);
    BaseComponent.prototype.remove.call(this);
  }
};

module.exports = Review;
