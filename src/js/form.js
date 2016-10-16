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
    sendReviewButton.disabled = !valid;
  };

  //Валидация поля отзыва
  var validateReview = function() {
    var valid = userReview.value.trim() !== '' || !(checkNegativeMark());
    userReview.required = checkNegativeMark();
    unfilledReview.hidden = valid;
    sendReviewButton.disabled = !valid;
  };

  //Добавялем обработчики на блок оценок и поля ввода.
  for (var i = 0; i < marks.length; i++) {
    marks[i].onchange = validateReview;
  }
  userName.oninput = validateName;
  userReview.oninput = validateReview;

  //Если заполнены оба поля, скрывать блок ссылок на них.
  if (unfilledName.hidden && unfilledReview.hidden) {
    unfilledBlock.style.display = 'none';
  } else {
    unfilledBlock.style.display = 'inline-block';
  }

  validateName();
  validateReview();



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
