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
   * Валидация полей формы отзыва.
   * @param {Element} fieldInput
   * @param {Element} fieldLabel
   */
  function validateField(fieldInput, fieldLabel) {

    //если оценка ниже средней, сделать поле обязательным
    for (var i = 0; i < marks.length; i++) {
      marks[i].onchange = function() {
        fieldInput.required = getMarkValue() < AVERAGE_MARK;
      };
    }

    /**
     * Проверка поля на наличие символов.
     * Скрытие ссылок на незаполненные поля.
     * Деактивация кнопки отправки.
     */
    fieldInput.oninput = function() {
      var valid = fieldInput.value.trim() !== '';
      fieldLabel.hidden = valid;
      sendReviewButton.disabled = !valid;

      //скрывать блок ссылок на поля, если заполнены оба поля
      if (unfilledName.hidden && unfilledReview.hidden) {
        unfilledBlock.style.display = 'none';
      } else {
        unfilledBlock.style.display = 'inline-block';
      }
    };
  }

  //Валидация формы отзыва.
  function validateForm() {
    userName.required = true;
    validateField(userName, unfilledName);
    validateField(userReview, unfilledReview);
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
