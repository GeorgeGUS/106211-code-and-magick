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

  //Поле ввода имени обязательно всегда.
  userName.required = true;

  //Проверка отрицательной оценки
  var checkNegativeMark = function() {
    for (var i = 0; i < marks.length; i++) {
      if (marks[i].checked) {
        var mark = marks[i].value;
      }
    }
    return mark < AVERAGE_MARK;
  };

  //Валидация поля имени
  var validateName = function() {
    var valid = userName.value.trim() !== '';
    unfilledName.hidden = valid;
    return valid;
  };

  //Валидация поля отзыва
  var validateReview = function() {
    var markState = checkNegativeMark();
    var valid = userReview.value.trim() !== '' || !markState;
    userReview.required = markState;
    unfilledReview.hidden = valid;
    return valid;
  };

  //Валидация всей формы отзыва
  var validateForm = function() {
    var nameIsValid = validateName();
    var reviewIsValid = validateReview();
    sendReviewButton.disabled = !(nameIsValid && reviewIsValid);
    if (nameIsValid && reviewIsValid) {
      unfilledBlock.style.display = 'none';
    } else {
      unfilledBlock.style.display = 'inline-block';
    }
  };

  //Добавялем обработчики на блок оценок и поля ввода.
  for (var i = 0; i < marks.length; i++) {
    marks[i].onchange = validateForm;
  }
  userName.oninput = validateForm;
  userReview.oninput = validateForm;

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
