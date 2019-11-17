'use strict';


var MAX_HASHTAG_COUNT = 5;
var MAX_HASHTAG_LENGTH = 20;

var imageEditor = {
  previewImageSection: document.querySelector('.img-upload'),
  intensity: 100,
  currentEffect: 'None',
  pin: undefined,
  scale: 100,
  previewImage: undefined,
  imageEditorDiv: undefined,
  imageSelector: undefined,
  levelLine: undefined,
  scaleValueStart: undefined,
  sclaePlusButton: undefined,
  scaleMinusButton: undefined,
  closePopupButton: undefined,
  effectLevel: undefined,
  effectLevelDepth: undefined,
  hashtagInput: undefined,
  buttonSubmit: undefined,

  onEscClick: function (evt) {
    if (evt.keyCode === 27) {
      imageEditor.closePopup();
    }
  },

  movePin: function (evt) {
    var rect = this.levelLine.getBoundingClientRect();
    var percentValue = (rect.right - rect.left) / 100;
    var mouseValue = (evt.clientX - rect.left) / percentValue;
    this.intensity = Math.round(mouseValue);
    if (this.intensity > 100) {
      this.intensity = 100;
    }
    if (this.intensity < 0) {
      this.intensity = 0;
    }
    this.setPinPos(this.intensity);
    this.changeEffect(this.currentEffect, this.intensity);
  },

  setPinPos: function (x) {
    this.pin.style.left = x + '%';
    this.effectLevelDepth.style.width = x + '%';
  },

  openFormForImage: function () {
    this.imageEditorDiv.classList.remove('hidden');
    document.addEventListener('keydown', this.onEscClick);
    this.reset();
  },

  subscribeToChangeEffect: function () {
    var subscribe = function (effect, name) {
      effect.addEventListener('click', function () {
        imageEditor.changeEffect(name, 100);
        imageEditor.setPinPos(100);
      });
    };

    var effectNone = this.previewImageSection.querySelector('#effect-none');
    var effectChrome = this.previewImageSection.querySelector('#effect-chrome');
    var effectSepia = this.previewImageSection.querySelector('#effect-sepia');
    var effectMarvin = this.previewImageSection.querySelector('#effect-marvin');
    var effectPhobos = this.previewImageSection.querySelector('#effect-phobos');
    var effectHeat = this.previewImageSection.querySelector('#effect-heat');

    subscribe(effectNone, 'None');
    subscribe(effectChrome, 'Chrome');
    subscribe(effectSepia, 'Sepia');
    subscribe(effectMarvin, 'Marvin');
    subscribe(effectPhobos, 'Phobos');
    subscribe(effectHeat, 'Heat');
  },

  findElemets: function () {
    this.pin = this.previewImageSection.querySelector('.effect-level__pin');
    this.previewImage = this.previewImageSection.querySelector('.img-upload__preview');
    this.imageEditorDiv = this.previewImageSection.querySelector('.img-upload__overlay');
    this.imageSelector = this.previewImageSection.querySelector('#upload-file');
    this.levelLine = this.previewImageSection.querySelector('.effect-level__line');
    this.scaleValueStart = this.previewImageSection.querySelector('.scale__control--value');
    this.sclaePlusButton = this.previewImageSection.querySelector('.scale__control--bigger');
    this.scaleMinusButton = this.previewImageSection.querySelector('.scale__control--smaller');
    this.closePopupButton = this.previewImageSection.querySelector('.img-upload__cancel');
    this.effectLevel = this.previewImageSection.querySelector('.img-upload__effect-level');
    this.effectLevelDepth = this.previewImageSection.querySelector('.effect-level__depth');
    this.hashtagInput = this.previewImageSection.querySelector('.text__hashtags');
    this.buttonSubmit = this.previewImageSection.querySelector('.img-upload__submit');
  },

  closePopup: function () {
    this.imageEditorDiv.classList.add('hidden');
    this.imageSelector.value = '';
    document.removeEventListener('keydown', this.onEscClick);
  },
  disableIntencityLine: function () {
    this.effectLevel.classList.add('hidden');
  },

  enableIntencityLine: function () {
    this.effectLevel.classList.remove('hidden');
  },

  checkHashtagFirstSymbol: function (hashtag) {
    return hashtag[0] === '#';
  },

  checkHashatagMinLength: function (hashtag) {
    return hashtag.length > 1;
  },

  checkHashtagSpaces: function (hashtag) {
    var countSymbol = 0;
    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag[i] === '#') {
        countSymbol++;
      }
    }
    return countSymbol > 1;
  },

  checkHashtagRepeat: function (hashtagArray) {
    var tempArray = [];
    var repeat = false;
    hashtagArray.forEach(function (hashtag) {
      if (tempArray.includes(hashtag.toLowerCase())) {
        repeat = true;
      } else {
        tempArray.push(hashtag.toLowerCase());
      }
    });
    return repeat;
  },

  checkHashtagArrayMaxLength: function (hashtagArray) {
    return hashtagArray.length > MAX_HASHTAG_COUNT;
  },

  checkHashtagMaxLength: function (hashtag) {
    return hashtag.length > MAX_HASHTAG_LENGTH;
  },

  hashtagInputChanging: function () {
    var hashtagArray = imageEditor.hashtagInput.value.split(' ');
    imageEditor.hashtagInput.setCustomValidity('');
    if (imageEditor.checkHashtagRepeat(hashtagArray)) {
      imageEditor.hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    }
    if (imageEditor.checkHashtagArrayMaxLength(hashtagArray)) {
      imageEditor.hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
    hashtagArray.forEach(function (hashtag) {
      if (!imageEditor.checkHashtagFirstSymbol(hashtag)) {
        imageEditor.hashtagInput.setCustomValidity('Хэштег не начинается с символа #');
      }
      if (!imageEditor.checkHashatagMinLength(hashtag)) {
        imageEditor.hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      }
      if (imageEditor.checkHashtagSpaces(hashtag)) {
        imageEditor.hashtagInput.setCustomValidity('хэш-теги должны разделяться пробелами');
      }
      if (imageEditor.checkHashtagMaxLength(hashtag)) {
        imageEditor.hashtagInput.setCustomValidity('максимальная длина одного хэш-тега должна быть не больше 20 символов, включая решётку');
      }
    });
  },


  subscribeToEvents: function () {
    this.imageSelector.addEventListener('change', function () {
      imageEditor.openFormForImage();
    });
    var onPinMove = function (evt) {
      imageEditor.movePin(evt);
    };
    var onPinMouseUp = function () {
      document.removeEventListener('mouseup', onPinMouseUp);
      document.removeEventListener('mousemove', onPinMove);
    };
    var onInputEscDown = function (evt) {
      if (evt.keyCode === 27) {
        evt.stopPropagation();
      }
    };
    this.pin.addEventListener('mousedown', function () {
      document.addEventListener('mousemove', onPinMove);
      document.addEventListener('mouseup', onPinMouseUp);
    });
    this.sclaePlusButton.addEventListener('click', function () {
      imageEditor.scaleTransformPlus();
    });
    this.scaleMinusButton.addEventListener('click', function () {
      imageEditor.scaleTransformMinus();
    });
    this.closePopupButton.addEventListener('click', function () {
      imageEditor.closePopup();
    });
    this.hashtagInput.addEventListener('input', function () {
      imageEditor.hashtagInputChanging();
    });
    this.hashtagInput.addEventListener('focus', function () {
      imageEditor.hashtagInput.addEventListener('keydown', onInputEscDown);
    });
    this.hashtagInput.addEventListener('blur', function () {
      imageEditor.hashtagInput.removeEventListener('keydown', onInputEscDown);
    });

    this.subscribeToChangeEffect();
  },

  changeEffect: function (name, value) {
    var filter = '';
    this.intensity = value;
    this.currentEffect = name;
    switch (name) {
      case 'None':
        filter = '';
        this.disableIntencityLine();
        break;
      case 'Chrome':
        filter = 'grayscale(' + (this.intensity / 100) + ')';
        this.enableIntencityLine();
        break;
      case 'Sepia':
        filter = 'sepia(' + (this.intensity / 100) + ')';
        this.enableIntencityLine();
        break;
      case 'Marvin':
        filter = 'invert(' + this.intensity + '%)';
        this.enableIntencityLine();
        break;
      case 'Phobos':
        filter = 'blur(' + (this.intensity * 0.03) + 'px)';
        this.enableIntencityLine();
        break;
      case 'Heat':
        filter = 'brightness(' + (1 + this.intensity / 50) + ')';
        this.enableIntencityLine();
        break;
      default:
        break;
    }
    this.previewImage.style.filter = filter;
  },

  scaleTransformMinus: function () {
    this.scale -= 25;
    if (this.scale < 0) {
      this.scale = 0;
    }
    this.scaleTransform();
  },

  scaleTransformPlus: function () {
    this.scale += 25;
    if (this.scale > 100) {
      this.scale = 100;
    }
    this.scaleTransform();
  },

  scaleTransform: function () {
    this.previewImage.style.transform = 'scale(' + this.scale / 100 + ')';
    this.scaleValueStart.value = this.scale + '%';
  },

  init: function () {
    this.findElemets();
    this.subscribeToEvents();
    this.reset();
  },

  reset: function () {
    this.scale = 100;
    this.scaleValueStart.value = this.scale + '%';
    this.changeEffect('None', 100);
    this.scaleTransform();
  },
};


var mainLogic = function () {

  imageEditor.init();
};

mainLogic();

