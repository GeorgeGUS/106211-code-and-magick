'use strict';

var load = require('./load');
var Review = require('./review');

var moreReviewsBtn = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var reviewsContainer = document.querySelector('.reviews-list');

var reviewBlockNumber = 0;

/**
 * @const
 * @type {number}
 */
var REVIEWS_BLOCK_SIZE = 3;

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
 * @type {string}
 */
var FILTER_KEY = 'currentFilter';

/**
 * Поиск ярлыка последнего выбранного фильтра отзывов
 * @param {string} key
 * @param {string} filterID
 * @return {string} filterID
 */
var getLastFilterLabel = function(key, filterID) {
  var currentFilterLabel = document.getElementById(filterID);

  if (currentFilterLabel !== null) {
    currentFilterLabel.checked = true;
  } else {
    filterID = DEFAULT_FILTER;
    localStorage.setItem(key, filterID);
    document.getElementById(filterID).checked = true;
  }

  return filterID;
};

/**
 * Поиск последнего выбранного фильтра отзывов
 * @param {string} key
 * @return {string} ID фильтра
 */
var getLastFilter = function(key) {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, DEFAULT_FILTER);
  }

  return getLastFilterLabel(key, localStorage.getItem(key));
};

var currentFilter = getLastFilter(FILTER_KEY);


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
    reviewsContainer.appendChild(new Review(data).element);
  });
  reviewsFilter.classList.remove(CLASS_INVISIBLE);

  if (reviewsList.length < REVIEWS_BLOCK_SIZE) {
    moreReviewsBtn.classList.add(CLASS_INVISIBLE);
  } else {
    moreReviewsBtn.classList.remove(CLASS_INVISIBLE);
  }
};

/** Обработчик события смены фильтра */
reviewsFilter.addEventListener('change', function(evt) {
  if (evt.target.name === 'reviews') {
    reviewsContainer.innerHTML = '';
    reviewBlockNumber = 0;
    currentFilter = evt.target.id;
    localStorage.setItem(FILTER_KEY, evt.target.id);
    loadReviews(currentFilter, reviewBlockNumber);
  }
});

/** Обработчик события клика по кнопке подгрузки отзывов */
moreReviewsBtn.addEventListener('click', function() {
  reviewBlockNumber = reviewBlockNumber + REVIEWS_BLOCK_SIZE;
  loadReviews(currentFilter, reviewBlockNumber);
});

var reviews = {
  load: function() {
    loadReviews(currentFilter, reviewBlockNumber);
  }
};

module.exports = reviews;
