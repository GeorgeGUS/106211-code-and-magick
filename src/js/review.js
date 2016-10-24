'use strict';


/**
 * Отрисивка одного блока отзыва
 * @param {Array} reviews
 * @returns {Node} reviewItem
 */
module.exports = function(reviews) {
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

