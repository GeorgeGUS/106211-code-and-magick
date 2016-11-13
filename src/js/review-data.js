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
  getAuthorImage: function() {
    return this.data.author.picture;
  },
  /** @return {number} */
  getTimeCreated: function() {
    return this.data.created;
  },
  /** @return {number} */
  getUsefulnessValue: function() {
    return this.data.review_usefulness;
  },
  /** @return {number} */
  getRatingValue: function() {
    return this.data.rating;
  },
  /** @return {string} */
  getDescriptionText: function() {
    return this.data.description;
  },

  /** @param {string} name */
  setAuthorName: function(name) {
    this.data.author.name = name;
  },
  /** @param {string} path */
  setAuthorImage: function(path) {
    this.data.author.picture = path;
  },
  /** @param {number} time */
  setTimeCreated: function(time) {
    this.data.created = time;
  },
  /** @param {number} value */
  setUsefulnessValue: function(value) {
    this.data.review_usefulness = value;
  },
  /** @param {number} value */
  setRatingValue: function(value) {
    this.data.rating = value;
  },
  /** @param {string} text */
  setDescriptionText: function(text) {
    this.data.description = text;
  }
};

module.exports = ReviewData;
