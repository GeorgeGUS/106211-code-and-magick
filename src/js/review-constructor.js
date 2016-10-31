'use strict';

var Review = function(element, data) {
  this.data = data;
  this.element = element;

  var self = this;

  /**
   * @const
   * @type {string}
   */
  var CLASS_ACTIVE = 'review-quiz-answer-active';

  this.answers = this.element.querySelectorAll('.review-quiz-answer');

  for (var i = 0; i < this.answers.length; i++) {
    this.answers[i].onclick = function() {
      for (i = 0; i < self.answers.length; i++) {
        self.answers[i].classList.remove(CLASS_ACTIVE);
      }
      this.classList.add(CLASS_ACTIVE);
    };
  }
};

Review.prototype = {
  remove: function() {
    this.answerYes.onclick = null;
    this.answerNo.onclick = null;
  }
};

module.exports = Review;
