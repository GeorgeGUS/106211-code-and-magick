'use strict';

/**
 * Разделение списка отзывов на блоки заданного размера
 * @param {Array} list
 * @param {number} from
 * @param {number} to
 */
module.exports = function(list, from, to) {
  return list.slice(from, to);
};
