'use strict';

var load = require('./load');
var getReviewItems = require('./review');

/**
 * @const
 * @type {string}
 */
var CLASS_INVISIBLE = 'invisible';

/**
 * Цикл отрисовки отзывов из базы
 * @param {Array} reviewsList
 */
var drawReviews = function(reviewsList) {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var reviewsContainer = document.querySelector('.reviews-list');

  reviewsFilter.classList.add(CLASS_INVISIBLE);
  reviewsList.forEach(function(review) {
    reviewsContainer.appendChild(getReviewItems(review));
  });
  reviewsFilter.classList.remove(CLASS_INVISIBLE);
};

var reviews = {
  load: function() {
    load('api/reviews', drawReviews, '__getCallback');
  }
};

module.exports = reviews;
