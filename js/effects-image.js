'use strict';
(function () {

  var DEFAULT_INTENSITY = 100;
  var MIN_INTENCITY = 0;
  var MAX_INTENCITY = 100;

  var intensity = DEFAULT_INTENSITY;
  var currentEffect = 'None';
  var previewImageSection = window.imageEditor.previewImageSection;
  var pin = previewImageSection.querySelector('.effect-level__pin');
  var levelLine = previewImageSection.querySelector('.effect-level__line');
  var effectLevel = previewImageSection.querySelector('.img-upload__effect-level');
  var effectLevelDepth = previewImageSection.querySelector('.effect-level__depth');

  // Сделал правильное передвижение сразу
  var movePin = function (evt) {
    var rect = levelLine.getBoundingClientRect();
    var percentValue = (rect.right - rect.left) / 100;
    var mouseValue = (evt.clientX - rect.left) / percentValue;
    intensity = Math.round(mouseValue);
    if (intensity > MAX_INTENCITY) {
      intensity = MAX_INTENCITY;
    }
    if (intensity < MIN_INTENCITY) {
      intensity = MIN_INTENCITY;
    }
    setPinPos(intensity);
    changeEffect(currentEffect, intensity);
  };

  var setPinPos = function (x) {
    pin.style.left = x + '%';
    effectLevelDepth.style.width = x + '%';
  };

  var subscribeEvents = function () {
    var onPinMove = function (evt) {
      movePin(evt);
    };
    var onPinMouseUp = function () {
      document.removeEventListener('mouseup', onPinMouseUp);
      document.removeEventListener('mousemove', onPinMove);
    };

    pin.addEventListener('mousedown', function () {
      document.addEventListener('mousemove', onPinMove);
      document.addEventListener('mouseup', onPinMouseUp);
    });

    subscribeToChangeEffect();
  };

  var subscribeToChangeEffect = function () {
    var subscribe = function (effect, name) {
      effect.addEventListener('click', function () {
        changeEffect(name, DEFAULT_INTENSITY);
        setPinPos(DEFAULT_INTENSITY);
      });
    };
    var effectNone = previewImageSection.querySelector('#effect-none');
    var effectChrome = previewImageSection.querySelector('#effect-chrome');
    var effectSepia = previewImageSection.querySelector('#effect-sepia');
    var effectMarvin = previewImageSection.querySelector('#effect-marvin');
    var effectPhobos = previewImageSection.querySelector('#effect-phobos');
    var effectHeat = previewImageSection.querySelector('#effect-heat');

    subscribe(effectNone, 'None');
    subscribe(effectChrome, 'Chrome');
    subscribe(effectSepia, 'Sepia');
    subscribe(effectMarvin, 'Marvin');
    subscribe(effectPhobos, 'Phobos');
    subscribe(effectHeat, 'Heat');
  };
  var disableIntencityLine = function () {
    effectLevel.classList.add('hidden');
  };

  var enableIntencityLine = function () {
    effectLevel.classList.remove('hidden');
  };
  var changeEffect = function (name, value) {
    var filter = '';
    intensity = value;
    currentEffect = name;
    switch (name) {
      case 'None':
        filter = '';
        disableIntencityLine();
        break;
      case 'Chrome':
        filter = 'grayscale(' + (intensity / 100) + ')';
        enableIntencityLine();
        break;
      case 'Sepia':
        filter = 'sepia(' + (intensity / 100) + ')';
        enableIntencityLine();
        break;
      case 'Marvin':
        filter = 'invert(' + intensity + '%)';
        enableIntencityLine();
        break;
      case 'Phobos':
        filter = 'blur(' + (intensity * 0.03) + 'px)';
        enableIntencityLine();
        break;
      case 'Heat':
        filter = 'brightness(' + (1 + intensity / 50) + ')';
        enableIntencityLine();
        break;
      default:
        break;
    }
    window.imageEditor.previewImage.style.filter = filter;
  };
  subscribeEvents();

  var reset = function () {
    changeEffect('None', DEFAULT_INTENSITY);
  };

  window.effectsImage = {
    reset: reset
  };

})();

