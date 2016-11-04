'use strict';

var load = require('./load');
var getReviewItems = require('./review');
var Review = require('./review-constructor');

var moreReviewsBtn = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');


/**
 * @const
 * @type {string}
 */
var CLASS_INVISIBLE = 'invisible';

/**
 * @const
 * @type {string}
 */
var DEFAULT_FILTER = 'reviews-all';

/**
 * @const
 * @type {number}
 */
var REVIEWS_BLOCK_SIZE = 3;

/** Начальное значение номера блока отзывов */
var reviewBlockNumber = 0;


/**
 * Главная функция загрузки блоков отзывов
 * @param {string} filterID
 * @param {number} blockNumber
 */
var loadReviews = function(filterID, blockNumber) {
  load('api/reviews', {
    from: blockNumber,
    to: blockNumber + REVIEWS_BLOCK_SIZE,
    filter: filterID
  }, drawReviews);
};

/**
 * Цикл отрисовки отзывов из базы
 * @param {Array} reviewsList
 */
var drawReviews = function(reviewsList) {
  reviewsFilter.classList.add(CLASS_INVISIBLE);
  reviewsList.forEach(function(data) {
    reviewsContainer.appendChild(new Review(getReviewItems(data), data).element);
  });
  reviewsFilter.classList.remove(CLASS_INVISIBLE);

  if (reviewBlockNumber + REVIEWS_BLOCK_SIZE > reviewsContainer.childElementCount) {
    moreReviewsBtn.classList.add(CLASS_INVISIBLE);
  } else {
    moreReviewsBtn.classList.remove(CLASS_INVISIBLE);
  }
};

/** Обработчик события смены фильтра */
reviewsFilter.addEventListener('change', function(evt) {
  if (evt.target.attributes[1].value === 'reviews') {
    reviewsContainer.innerHTML = '';
    reviewBlockNumber = 0;
    loadReviews(evt.target.id, reviewBlockNumber);
  }
});

/** Обработчик события клика по кнопке подгрузки отзывов */
moreReviewsBtn.addEventListener('click', function() {
  reviewBlockNumber = reviewBlockNumber + REVIEWS_BLOCK_SIZE;
  loadReviews(DEFAULT_FILTER, reviewBlockNumber);
});

var reviews = {
  load: function() {
    loadReviews(DEFAULT_FILTER, reviewBlockNumber);
  }
};

module.exports = reviews;
