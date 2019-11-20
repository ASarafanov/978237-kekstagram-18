'use strict';

(function () {

  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;

  var previewImageSection = window.imageEditor.previewImageSection;
  var hashtagInput = previewImageSection.querySelector('.text__hashtags');
  var commentsInput = previewImageSection.querySelector('.text__description');



  var checkHashtagFirstSymbol = function (hashtag) {
    return hashtag[0] === '#';
  };

  var checkHashatagMinLength = function (hashtag) {
    return hashtag.length > 1;
  };

  var checkHashtagSpaces = function (hashtag) {
    var countSymbol = 0;
    for (var i = 0; i < hashtag.length; i++) {
      if (hashtag[i] === '#') {
        countSymbol++;
      }
    }
    return countSymbol > 1;
  };

  var checkHashtagRepeat = function (hashtags) {
    var tempArray = [];
    var repeat = false;
    hashtags.forEach(function (hashtag) {
      if (tempArray.includes(hashtag.toLowerCase())) {
        repeat = true;
      } else {
        tempArray.push(hashtag.toLowerCase());
      }
    });
    return repeat;
  };

  var checkHashtagArrayMaxLength = function (hashtags) {
    return hashtags.length > MAX_HASHTAG_COUNT;
  };

  var checkHashtagMaxLength = function (hashtag) {
    return hashtag.length > MAX_HASHTAG_LENGTH;
  };

  var hashtagInputChanging = function () {
    var hashtags = hashtagInput.value.split(' ');
    hashtagInput.setCustomValidity('');
    if (checkHashtagRepeat(hashtags)) {
      hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    }
    if (checkHashtagArrayMaxLength(hashtags)) {
      hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    }
    hashtags.forEach(function (hashtag) {
      if (!checkHashtagFirstSymbol(hashtag)) {
        hashtagInput.setCustomValidity('Хэштег не начинается с символа #');
      }
      if (!checkHashatagMinLength(hashtag)) {
        hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      }
      if (checkHashtagSpaces(hashtag)) {
        hashtagInput.setCustomValidity('хэш-теги должны разделяться пробелами');
      }
      if (checkHashtagMaxLength(hashtag)) {
        hashtagInput.setCustomValidity('максимальная длина одного хэш-тега должна быть не больше 20 символов, включая решётку');
      }
    });
  };

  var onInputEscDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  var reset = function () {
    hashtagInput.value = "";
    commentsInput.value = "";
  };

  hashtagInput.addEventListener('input', function () {
    hashtagInputChanging();
  });
  hashtagInput.addEventListener('focus', function () {
    hashtagInput.addEventListener('keydown', onInputEscDown);
  });
  hashtagInput.addEventListener('blur', function () {
    hashtagInput.removeEventListener('keydown', onInputEscDown);
  });
  commentsInput.addEventListener('focus', function () {
    commentsInput.addEventListener('keydown', onInputEscDown);
  });
  commentsInput.addEventListener('blur', function () {
    commentsInput.removeEventListener('keydown', onInputEscDown);
  });
  commentsInput.maxLength = MAX_COMMENTS_LENGTH;

  window.validation = {
    reset: reset
  };
})();

