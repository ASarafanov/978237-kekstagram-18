'use strict';


(function () {
  var MIN_AVATARS = 1;
  var MAX_AVATARS = 6;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var likesLabel = bigPicture.querySelector('.likes-count');
  var commentsCountLabel = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var updatePhotoInfo = function (photoObject) {
    bigPictureImg.src = photoObject.url;
    likesLabel.textContent = photoObject.likes;
    commentsCountLabel.textContent = photoObject.comments.length;
    description.textContent = photoObject.description;
    socialCommentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');
  };

  var deleteCommentsFunction = function (parentNode, nodesForDelete) {
    for (var i = 0; i < nodesForDelete.length; i++) {
      parentNode.removeChild(nodesForDelete[i]);
    }
  };

  var tempOpenPhoto = function (photo) {
    bigPicture.classList.remove('hidden');
    updatePhotoInfo(photo);
    var socialComments = bigPicture.querySelector('.social__comments');
    var deleteComments = socialComments.querySelectorAll('li');
    deleteCommentsFunction(socialComments, deleteComments);
    showComments(photo, deleteComments[0], socialComments);
    document.addEventListener('keydown', onEscDown);
  };

  var onEscDown = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var subscribeToCloseButton = function () {
    var closeButton = bigPicture.querySelector('.big-picture__cancel');
    closeButton.addEventListener('click', function () {
      closePopup();
    });
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscDown);
  };

  var showComments = function (photo, commentTemplate, place) {
    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var tempComment = commentTemplate.cloneNode(true);
      var imageComment = tempComment.querySelector('.social__picture');
      imageComment.src = 'img/avatar-' + window.util.getRandomInt(MIN_AVATARS, MAX_AVATARS) + '.svg';
      imageComment.alt = photo.comments[i].name;
      tempComment.querySelector('p').textContent = photo.comments[i].message;
      commentsFragment.appendChild(tempComment);
    }
    place.appendChild(commentsFragment);
  };

  window.preview = {
    openPhoto: tempOpenPhoto
  };
  subscribeToCloseButton();

})();

