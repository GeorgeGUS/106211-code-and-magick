'use strict';

/**
 * Конструктор объекта отзыва для работы с данными.
 * @param {Object} data
 * @constructor
 */
var ReviewData = function(data) {
  this.data = data;
};

ReviewData.prototype = {
  /** @return {string} */
  getAuthorName: function() {
    return this.data.author.name;
  },
  /** @return {string} */
  getAuthorPicture: function() {
    return this.data.author.picture;
  },
  /** @return {number} */
  getCreated: function() {
    return this.data.created;
  },
  /** @return {number} */
  getUsefulness: function() {
    return this.data.review_usefulness;
  },
  /** @return {number} */
  getRating: function() {
    return this.data.rating;
  },
  /** @return {string} */
  getDescription: function() {
    return this.data.description;
  },

  /** @param {string} name */
  setAuthorName: function(name) {
    this.data.author.name = name;
  },
  /** @param {string} picture */
  setAuthorPicture: function(picture) {
    this.data.author.picture = picture;
  },
  /** @param {number} created */
  setCreated: function(created) {
    this.data.created = created;
  },
  /** @param {number} usefulness */
  setUsefulness: function(usefulness) {
    this.data.review_usefulness = usefulness;
  },
  /** @param {number} rating */
  setRating: function(rating) {
    this.data.rating = rating;
  },
  /** @param {string} description */
  setDescription: function(description) {
    this.data.description = description;
  }
};

module.exports = ReviewData;
