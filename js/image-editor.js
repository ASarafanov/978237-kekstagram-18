'use strict';


(function () {
  var previewImageSection = document.querySelector('.img-upload');
  var previewImage = previewImageSection.querySelector('.img-upload__preview');
  var imageEditorDiv = previewImageSection.querySelector('.img-upload__overlay');
  var imageSelector = previewImageSection.querySelector('#upload-file');
  var closePopupButton = previewImageSection.querySelector('.img-upload__cancel');

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
