'use strict';

window.form = (function() {
  /**
   * @const
   * @type {number}
   */
  var AVERAGE_MARK = 3;

  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var userName = document.querySelector('#review-name');
  var userReview = document.querySelector('#review-text');
  var marks = document.querySelectorAll('input[name="review-mark"]');
  var sendReviewButton = document.querySelector('.review-submit');
  var unfilledBlock = document.querySelector('.review-fields');
  var unfilledName = document.querySelector('.review-fields-name');
  var unfilledReview = document.querySelector('.review-fields-text');

  //Получаем значение оценки пользователя
  var getMarkValue = function() {
    for (var i = 0; i < marks.length; i++) {
      if (marks[i].checked) {
        var mark = marks[i].getAttribute('value');
      }
    }
    return mark;
  };

  /**
   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
   * и показывает приветственный экран.
   * @param {Element} fieldInput
   * @param {Element} fieldLabel
   */
  function validateField(fieldInput, fieldLabel) {
    for (var i = 0; i < marks.length; i++) {
      marks[i].onchange = function() {
        fieldInput.required = getMarkValue() < AVERAGE_MARK;
      };
    }
    fieldInput.oninput = function() {
      if (fieldInput.value === '') {
        fieldLabel.hidden = false;
        sendReviewButton.disabled = true;
      } else {
        fieldLabel.hidden = true;
        sendReviewButton.disabled = false;
      }
    };
  }
  //Функция валидации формы
  function validateForm() {
    userName.required = true;
    validateField(userName, unfilledName);
    validateField(userReview, unfilledReview);
    unfilledBlock.hidden = (unfilledName.hidden && unfilledReview.hidden);//не работает
  }

  validateForm();

  var form = {
    onClose: null,

    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };


  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };

  return form;
})();
