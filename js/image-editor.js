'use strict';


(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var previewImageSection = document.querySelector('.img-upload');
  var previewImage = previewImageSection.querySelector('.img-upload__preview');
  var imageEditorDiv = previewImageSection.querySelector('.img-upload__overlay');
  var imageSelector = previewImageSection.querySelector('#upload-file');
  var closePopupButton = previewImageSection.querySelector('.img-upload__cancel');
  var photoForm = previewImageSection.querySelector('.img-upload__form');
  var main = document.querySelector('main');

  var onMouseClick = function () {
    closeSuccessMenu();
  };

  var closeSuccessMenu = function () {
    var successMenu = document.querySelector('.success');
    main.removeChild(successMenu);
    document.removeEventListener('keydown', onEscCloseSuccessMenu);
    document.removeEventListener('click', onMouseClick);
  };

  var onEscCloseSuccessMenu = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccessMenu();
    }
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success');
    var element = successTemplate.content.cloneNode(true);
    document.addEventListener('keydown', onEscCloseSuccessMenu);

    closePopup();
    // var coolButton = element.querySelector('button');
    document.addEventListener('click', onMouseClick);
    main.appendChild(element);
  };

  var onError = function (message) {
    closePopup();
    window.util.showError(message);
  };

  var imageUpload = function () {
    window.network.postData(new FormData(photoForm), URL, onSuccess, onError);
  };

  var onEscClick = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var openFormForImage = function () {
    imageEditorDiv.classList.remove('hidden');
    document.addEventListener('keydown', onEscClick);
    reset();
  };

  var closePopup = function () {
    imageEditorDiv.classList.add('hidden');
    imageSelector.value = '';
    document.removeEventListener('keydown', onEscClick);
  };

  var subscribeToEvents = function () {
    imageSelector.addEventListener('change', function () {
      openFormForImage();
    });
    closePopupButton.addEventListener('click', function () {
      closePopup();
    });
    photoForm.addEventListener('submit', function (evt) {
      imageUpload();
      evt.preventDefault();
    });
  };

  var reset = function () {
    window.effectsImage.reset();
    window.zoomImage.reset();
  };

  subscribeToEvents();

  window.imageEditor = {
    previewImageSection: previewImageSection,
    previewImage: previewImage
  };

})();
