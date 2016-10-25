'use strict';

var load = require('./load');
var getReviewItems = require('./review');

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

load(REVIEWS_LOAD_URL, drawReviews, '__getCallback');
