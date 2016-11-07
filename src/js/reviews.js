'use strict';

var load = require('./load');
var getReviewItems = require('./review');
var Review = require('./review-constructor');

var moreReviewsBtn = document.querySelector('.reviews-controls-more');
var reviewsFilter = document.querySelector('.reviews-filter');
var filterItems = reviewsFilter.getElementsByTagName('input');
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

/** Начальное положение блока отзывов */
var reviewBlockNumber = 0;

/** Начальное значение фильтра */
if (localStorage.length === 0) {
  localStorage.setItem('currentFilter', DEFAULT_FILTER);
}

/** Текущее значение фильтра из памяти */
var currentFilter = localStorage.getItem('currentFilter');

/** Установка последнего сохранённого ярлыка фильтра */
for (var i = 0; i < filterItems.length; i++) {
  if (filterItems[i].id === currentFilter) {
    filterItems[i].checked = true;
  }
}

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
    localStorage.setItem('currentFilter', evt.target.id);
    currentFilter = localStorage.getItem('currentFilter');
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
