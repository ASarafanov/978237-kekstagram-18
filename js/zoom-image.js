'use strict';

(function () {

  var DEFAULT_SCALE = 100;
  var MAX_SCALE = 100;
  var MIN_SCALE = 0;
  var STEP_SCALE = 25;
  var scale = DEFAULT_SCALE;

  var previewImageSection = window.imageEditor.previewImageSection;
  var scalePlusButton = previewImageSection.querySelector('.scale__control--bigger');
  var scaleMinusButton = previewImageSection.querySelector('.scale__control--smaller');
  var scaleValueStart = previewImageSection.querySelector('.scale__control--value');

  var scaleTransformMinus = function () {
    scale -= STEP_SCALE;
    if (scale < MIN_SCALE) {
      scale = MIN_SCALE;
    }
    scaleTransform();
  };

  var scaleTransformPlus = function () {
    scale += STEP_SCALE;
    if (scale > MAX_SCALE) {
      scale = MAX_SCALE;
    }
    scaleTransform();
  };

  var scaleTransform = function () {
    window.imageEditor.previewImage.style.transform = 'scale(' + scale / 100 + ')';
    scaleValueStart.value = scale + '%';
  };
  scalePlusButton.addEventListener('click', function () {
    scaleTransformPlus();
  });
  scaleMinusButton.addEventListener('click', function () {
    scaleTransformMinus();
  });

  var reset = function () {
    scale = DEFAULT_SCALE;
    scaleTransform();
  };

  scaleTransform();

  window.zoomImage = {
    reset: reset
  };

})();
