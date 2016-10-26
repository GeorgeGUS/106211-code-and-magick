'use strict';

var load = require('./load');
var getReviewItems = require('./review');

/**
 * @const
 * @type {string}
 */
var CLASS_INVISIBLE = 'invisible';

var reviews = {
  /**
   * Цикл отрисовки отзывов из базы
   * @param {Array} reviewsList
   */
  drawReviews: function(reviewsList) {
    var reviewsFilter = document.querySelector('.reviews-filter');
    var reviewsContainer = document.querySelector('.reviews-list');

    reviewsFilter.classList.add(CLASS_INVISIBLE);
    reviewsList.forEach(function(review) {
      reviewsContainer.appendChild(getReviewItems(review));
    });
    reviewsFilter.classList.remove(CLASS_INVISIBLE);
  },

  load: load
};

module.exports = reviews;
