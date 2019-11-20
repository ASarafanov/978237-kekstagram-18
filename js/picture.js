'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var filterSection = document.querySelector('.img-filters');
  var picturesBlock = document.querySelector('.pictures');
  var formSection = filterSection.querySelector('form');
  var popularButton = formSection.querySelector('#filter-popular');
  var randomButton = formSection.querySelector('#filter-random');
  var discussButton = formSection.querySelector('#filter-discussed');

  var photosArray;

  var showPhotos = function (photosData) {
    clearOldPhotos();
    photosArray = photosData;
    var template = document.querySelector('#picture');
    var content = template.content;
    var fragment = document.createDocumentFragment();
    photosData.forEach(function (photo, index) {
      var element = content.cloneNode(true);
      var image = element.querySelector('.picture__img');
      image.src = photo.url;
      var commentsSpan = element.querySelector('.picture__comments');
      commentsSpan.textContent = photo.comments.length;
      var likesSpan = element.querySelector('.picture__likes');
      likesSpan.textContent = photo.likes;
      subscribeToImageClick(index, element);
      subscribeToImageEnter(index, element);
      fragment.appendChild(element);
    });
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
      window.preview.openPhoto(photosArray[index]);
    });
  };

  var onGetPhotoSuccess = function (photoData) {
    photosArray = photoData;
    showPhotos(photosArray);

    openFilters();
    window.pictures = {
      photoArray: photoData
    };
  };
  var onPopularClick = function () {
    window.util.debounce(function () {
      var tempPhotoArray = window.filter.getPopularPhoto();
      showPhotos(tempPhotoArray);
    });

    popularButton.classList.add('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussButton.classList.remove('img-filters__button--active');
  };
  var onRandomClick = function () {
    window.util.debounce(function () {
      var tempPhotoArray = window.filter.getRandomPhoto();
      showPhotos(tempPhotoArray);
    });
    popularButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    discussButton.classList.remove('img-filters__button--active');
  };
  var onDiscussedClick = function () {
    window.util.debounce(function () {
      var tempPhotoArray = window.filter.getSortPhoto();
      showPhotos(tempPhotoArray);
    });
    popularButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussButton.classList.add('img-filters__button--active');
  };
  var openFilters = function () {
    filterSection.classList.remove('img-filters--inactive');
    popularButton.addEventListener('click', onPopularClick);
    randomButton.addEventListener('click', onRandomClick);
    discussButton.addEventListener('click', onDiscussedClick);
  };

  var clearOldPhotos = function () {
    var photosForDelete = picturesBlock.querySelectorAll('a');
    photosForDelete.forEach(function (photo) {
      picturesBlock.removeChild(photo);
    });
  };

  window.network.getData(URL, onGetPhotoSuccess, window.util.showError);


})();
