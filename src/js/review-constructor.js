'use strict';

var Review = function(element, data) {
  this.data = data;
  this.element = element(data);

  var self = this;

  /**
   * @const
   * @type {string}
   */
  var CLASS_ACTIVE = 'review-quiz-answer-active';

  this.answerPositive = this.element.querySelector('.review-quiz-answer-yes');
  this.answerNegative = this.element.querySelector('.review-quiz-answer-no');

  /**
   * Подключение обработчика события по клику на один из ответов
   * и проверка их на активное состояние
   * @param {Node} pros выбранный ответ
   * @param {Node} cons противоположный ответ
   */
  var setAnswerListener = function(pros, cons) {
    pros.onclick = function() {
      if (cons.classList.contains(CLASS_ACTIVE)) {
        cons.classList.remove(CLASS_ACTIVE);
        pros.classList.add(CLASS_ACTIVE);
      } else {
        pros.classList.add(CLASS_ACTIVE);
      }
    };
  };

  setAnswerListener(self.answerPositive, self.answerNegative);
  setAnswerListener(self.answerNegative, self.answerPositive);

  this.remove = function() {
    this.answerPositive.onclick = null;
    this.answerNegative.onclick = null;
  };

  return this.element;
};

module.exports = Review;
