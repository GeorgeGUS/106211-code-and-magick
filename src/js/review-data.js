'use strict';

/**
 * Конструктор объекта отзыва для работы с данными.
 * @param {Object} data
 * @constructor
 */
var ReviewData = function(data) {
  this.authorName = data.author.name;
  this.authorPicture = data.author.picture;
  this.created = data.created;
  this.reviewUsefulness = data.review_usefulness;
  this.rating = data.rating;
  this.description = data.description;
};

ReviewData.prototype = {
  /** @return {string} */
  getAuthorName: function() {
    return this.authorName;
  },
  /** @return {string} */
  getAuthorPicture: function() {
    return this.authorPicture;
  },
  /** @return {number} */
  getCreated: function() {
    return this.created;
  },
  /** @return {number} */
  getUsefulness: function() {
    return this.reviewUsefulness;
  },
  /** @return {number} */
  getRating: function() {
    return this.rating;
  },
  /** @return {string} */
  getDescription: function() {
    return this.description;
  },

  /** @param {string} name */
  setAuthorName: function(name) {
    this.authorName = name;
  },
  /** @param {string} picture */
  setAuthorPicture: function(picture) {
    this.authorPicture = picture;
  },
  /** @param {number} created */
  setCreated: function(created) {
    this.created = created;
  },
  /** @param {number} usefulness */
  setUsefulness: function(usefulness) {
    this.reviewUsefulness = usefulness;
  },
  /** @param {number} rating */
  setRating: function(rating) {
    this.rating = rating;
  },
  /** @param {string} description */
  setDescription: function(description) {
    this.description = description;
  }
};

module.exports = ReviewData;
