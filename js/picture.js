'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var picturesBlock = document.querySelector('.pictures');

  var photoArray;
  var showPhotos = function (photoData) {
    photoArray = photoData;
    var template = document.querySelector('#picture');
    var content = template.content;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photoArray.length; i++) {
      var photo = photoArray[i];
      var element = content.cloneNode(true);
      var image = element.querySelector('.picture__img');
      image.src = photo.url;
      var commentsSpan = element.querySelector('.picture__comments');
      commentsSpan.textContent = photo.comments.length;
      var likesSpan = element.querySelector('.picture__likes');
      likesSpan.textContent = photo.likes;
      subscribeToImageClick(i, element);
      subscribeToImageEnter(i, element);
      fragment.appendChild(element);
    }
    picturesBlock.appendChild(fragment);
  };

  var subscribeToImageEnter = function (index, element) {
    var onEnterDown = function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        window.preview.openPhoto(index);
      }
    };
    element.querySelector('a').addEventListener('focus', function () {
      document.addEventListener('keydown', onEnterDown);
    });
    element.querySelector('a').addEventListener('blur', function () {
      document.removeEventListener('keydown', onEnterDown);
    });
  };

  var subscribeToImageClick = function (index, element) {
    element.querySelector('img').addEventListener('click', function () {
      window.preview.openPhoto(photoArray[index]);
    });
  };

  var showError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error');
    var element = errorTemplate.content.cloneNode(true);
    var main = document.querySelector('main');
    element.querySelector('.error__title').textContent = errorMessage;
    main.appendChild(element);
  };

  window.network.getData(URL, showPhotos, showError);


})();
