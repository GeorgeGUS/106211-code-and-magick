'use strict';

/**
 * Конструктор базовой DOM-компоненты
 * @param (Node) element
 * @constructor
 */

var BaseComponent = function(element) {
  this.element = element;
};

BaseComponent.prototype = {
  appendTo: function(container) {
    container.appendChild(this.element);
  },

  remove: function() {
    this.element.parentNode.removeChild(this.element);
  }
};

module.exports = BaseComponent;
