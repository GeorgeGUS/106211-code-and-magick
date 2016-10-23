'use strict';

(function() {
  /**
   * @const
   * @type {string}
   */
  var CLASS_INVISIBLE = 'invisible';

  /**
   * HTTP-адрес для загрузки списка отзывов
   * @const
   * @type {string}
   */
  var REVIEWS_LOAD_URL = 'api/reviews';


  /**
   * Загрузка списка отзывов с сервера
   * @param {String} url
   * @param {Function} callback
   * @param {String} callbackName
   */
  var loadReviews = function(url, callback, callbackName) {
    var script = document.createElement('script');

    if (!callbackName) {
      callbackName = '__getReviewsCallback';
    }
    window[callbackName] = function(data) {
      window.reviews = callback(data);
    };
    script.src = url + '?callback=' + callbackName;
    document.body.appendChild(script);
  };

  /**
   * Заполнение шаблона отзыва
   * @param {Array} reviews
   * @returns {Node} reviewItem
   */
  var getReviewItems = function(reviews) {
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

  /**
   * Цикл отрисовки отзывов из базы
   * @param {Array} reviews
   */
  var drawReviews = function(reviews) {
    var reviewsFilter = document.querySelector('.reviews-filter');
    var reviewsContainer = document.querySelector('.reviews-list');

    reviewsFilter.classList.add(CLASS_INVISIBLE);
    reviews.forEach(function(review) {
      reviewsContainer.appendChild(getReviewItems(review));
    });
    reviewsFilter.classList.remove(CLASS_INVISIBLE);
  };

  loadReviews(REVIEWS_LOAD_URL ,drawReviews, '__getReviewsCallback');
})();
