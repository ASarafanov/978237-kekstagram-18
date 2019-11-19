'use strict';


(function () {
  var STEP_COMMENTS = 5;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  var likesLabel = bigPicture.querySelector('.likes-count');
  var commentsCountLabel = bigPicture.querySelector('.comments-count');
  var description = bigPicture.querySelector('.social__caption');
  var socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var socialComments = bigPicture.querySelector('.social__comments');
  var templateComments = socialComments.querySelector('li');

  var showedCommentsCount = 0;

  var photo;

  var onCommentsLoaderClick = function () {
    createComments();
    if (showedCommentsCount === photo.comments.length) {
      commentsLoader.classList.add('visually-hidden');
    }
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  var createComments = function () {
    var tempArrayLength = (showedCommentsCount + STEP_COMMENTS) > photo.comments.length ? photo.comments.length : showedCommentsCount + STEP_COMMENTS;
    var commentsFragment = document.createDocumentFragment();
    for (var i = showedCommentsCount; i < tempArrayLength; i++) {
      var currentComment = photo.comments[i];
      var tempComment = templateComments.cloneNode(true);
      var imageComment = tempComment.querySelector('.social__picture');
      imageComment.src = currentComment.avatar;
      imageComment.alt = currentComment.name;
      tempComment.querySelector('p').textContent = currentComment.message;
      commentsFragment.appendChild(tempComment);
    }
    showedCommentsCount = tempArrayLength;
    socialComments.appendChild(commentsFragment);
  };

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

  var tempOpenPhoto = function (tempPhoto) {
    showedCommentsCount = 0;
    photo = tempPhoto;
    bigPicture.classList.remove('hidden');
    updatePhotoInfo(photo);
    var deleteAllComments = socialComments.querySelectorAll('li');
    deleteCommentsFunction(socialComments, deleteAllComments);
    showComments();
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

  var showComments = function () {
    if (photo.comments.length > STEP_COMMENTS) {
      commentsLoader.classList.remove('visually-hidden');
    }
    createComments();
  };

  window.preview = {
    openPhoto: tempOpenPhoto
  };
  subscribeToCloseButton();

})();

