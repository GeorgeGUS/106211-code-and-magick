'use strict';


/**
 * Отрисивка одного блока отзыва
 * @param {Array} reviews
 * @returns {Node} reviewItem
 */
var getReviewItem = function(reviews) {
  var template = document.getElementById('review-template'),
    templateContainer = 'content' in template ? template.content : template,
    reviewItem = templateContainer.cloneNode(true),
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
  authorImage.src = reviews.author.picture;
  reviewText.textContent = reviews.description;
  reviewItem.querySelector('.review-rating').classList.add('review-rating-' + ratingClasses[reviews.rating - 1]);

  return reviewItem;
};

var Review = function(data) {
  this.data = data;
  this.element = getReviewItem(this.data);

  var self = this;

  /**
   * @const
   * @type {string}
   */
  var CLASS_ACTIVE = 'review-quiz-answer-active';

  this.answers = this.element.querySelectorAll('.review-quiz-answer');

  Array.prototype.forEach.call(this.answers, function(answer) {
    answer.addEventListener('click', function(evt) {
      for (var i = 0; i < self.answers.length; i++) {
        self.answers[i].classList.remove(CLASS_ACTIVE);
      }
      evt.target.classList.add(CLASS_ACTIVE);
    });
  });
};

Review.prototype = {
  remove: function() {
    Array.prototype.forEach.call(this.answers, function(answer) {
      answer.removeEventListener('click');
    });
  }
};

module.exports = Review;
