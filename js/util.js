'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  var getRandomInt = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var showError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    var element = errorTemplate.content.cloneNode(true);
    var main = document.querySelector('main');
    element.querySelector('.error__title').textContent = errorMessage;
    document.addEventListener('keydown', onEscCloseErrorMenu);
    document.addEventListener('click', onMouseClick);
    main.appendChild(element);
  };

  var onMouseClick = function () {
    closeErrorMenu();
  };

  var closeErrorMenu = function () {
    var errorMenu = document.querySelector('.error');
    var main = document.querySelector('main');
    main.removeChild(errorMenu);
    document.removeEventListener('keydown', onEscCloseErrorMenu);
    document.removeEventListener('click', onMouseClick);
  };

  var onEscCloseErrorMenu = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeErrorMenu();
    }
  };

  var getCloneArray = function (array) {
    return array.slice();
  };

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    getRandomInt: getRandomInt,
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    showError: showError,
    shuffle: shuffle,
    getCloneArray: getCloneArray,
    debounce: debounce
  };

})();
