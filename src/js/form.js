'use strict';

window.form = (function() {
  /**
   * @const
   * @type {number}
   */
  var AVERAGE_MARK = 3;

  var formContainer = document.querySelector('.overlay-container');
  var formCloseButton = document.querySelector('.review-form-close');
  var userName = document.getElementById('review-name');
  var userReview = document.getElementById('review-text');
  var marks = document.querySelectorAll('input[name="review-mark"]');
  var sendReviewButton = document.querySelector('.review-submit');
  var unfilledBlock = document.querySelector('.review-fields');
  var unfilledName = document.querySelector('.review-fields-name');
  var unfilledReview = document.querySelector('.review-fields-text');

  //Получение значения оценки
  var getMarkValue = function() {
    for (var i = 0; i < marks.length; i++) {
      if (marks[i].checked) {
        var mark = marks[i].value;
      }
    }
    return mark;
  };

  /**
   * Проверка полей формы отзыва на валидность.
   * @param {Element} fieldInput
   * @param {Element} fieldLabel
   */
  var validate = function(fieldInput, fieldLabel) {
    /**
     * Проверка поля на наличие символов и .
     * Скрытие ссылок на незаполненные поля.
     * Деактивация кнопки отправки.
     */
    var valid = fieldInput.value.trim() !== '' || getMarkValue() >= AVERAGE_MARK;
    fieldLabel.hidden = valid;
    sendReviewButton.disabled = !valid;

    //Если заполнены оба поля, скрывать блок ссылок на них.
    if (unfilledName.hidden && unfilledReview.hidden) {
      unfilledBlock.style.display = 'none';
    } else {
      unfilledBlock.style.display = 'inline-block';
    }
  };

  //Поле ввода имени обязательно всегда.
  userName.required = true;

  /**
   * Следим за изменением оценки.
   * Если оценка ниже средней, делаем поле ввода отзыва обязательным
   * и проверяем его на валидность.
   */
  for (var i = 0; i < marks.length; i++) {
    marks[i].onchange = function() {
      userReview.required = getMarkValue() < AVERAGE_MARK;
      validate(userReview, unfilledReview);
    };
  }

  // var check = validate;
  // userName.oninput = check(userName, unfilledName);
  // userReview.oninput = check(userReview, unfilledReview);

  userName.oninput = function() {
    validate(this, unfilledName);
  };

  userReview.oninput = function() {
    validate(this, unfilledReview);
  };

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
