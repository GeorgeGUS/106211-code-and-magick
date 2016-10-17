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
  var currentDate = new Date();
  var GHopperBirthday = new Date(currentDate.getFullYear(), 11, 9);

  /** Установка обязательности поля имени */
  userName.required = true;

  /**
   * Проверка отрицательной оценки
   * @returns {Boolean}
   */
  var checkNegativeMark = function() {
    for (var i = 0; i < marks.length; i++) {
      if (marks[i].checked) {
        var mark = parseInt(marks[i].value, 0);
      }
    }
    return mark < AVERAGE_MARK;
  };

  /**
   * Валидация поля имени
   * @returns {Boolean}
   */
  var validateName = function() {
    var valid = userName.value.trim() !== '';
    unfilledName.hidden = valid;
    return valid;
  };

  /**
   * Валидация поля отзыва
   * @returns {Boolean}
   */
  var validateReview = function() {
    var markState = checkNegativeMark();
    var valid = userReview.value.trim() !== '' || !markState;
    userReview.required = markState;
    unfilledReview.hidden = valid;
    return valid;
  };

  /** Валидация всей формы отзыва
   * Если оба поля не валидны, отключает кнопку отправки формы
   * Если оба поля валидны, скрывает блок ссылок на них
   */
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

  for (var i = 0; i < marks.length; i++) {
    marks[i].onchange = validateForm;
  }
  userName.oninput = validateForm;
  userReview.oninput = validateForm;

  validateForm();


  /**
   * Получение срока жизни файла сookie в днях, начиная
   * с последнего прошедшего дня рождения Грейс Хоппер
   * @returns {Number}
   */
  var getCookieLifeTime = function() {
    var cookieLifeTime;
    if (GHopperBirthday > currentDate) {
      GHopperBirthday.setFullYear(currentDate.getFullYear() - 1);
    }
    cookieLifeTime = Math.ceil((currentDate - GHopperBirthday) / (3600 * 24 * 1000));
    return cookieLifeTime;
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
