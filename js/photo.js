'use strict';

var COMMENTS_ARRAY = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAME_ARRAY = [
  'Игорь',
  'Даниил',
  'Анастасия',
  'Павел',
  'Евгений'
];

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 5;
var PHOTO_COUNT = 25;
var MIN_AVATARS = 1;
var MAX_AVATARS = 6;


var photoWindow = {
  bigPicture: document.querySelector('.big-picture'),
  bigPictureImg: undefined,
  likesLabel: undefined,
  commentsCountLabel: undefined,
  description: undefined,
  socialCommentsCount: undefined,
  commentsLoader: undefined,
  picturesBlock: undefined,
  photoArray: undefined,

  getFirstPhoto: function (photoArray) {
    var photoObject = photoArray[0];
    return photoObject;
  },
  updatePhotoInfo: function (photoObject) {
    this.bigPictureImg.src = photoObject.url;
    this.likesLabel.textContent = photoObject.likes;
    this.commentsCountLabel.textContent = photoObject.comments.length;
    this.description.textContent = photoObject.description;
    this.socialCommentsCount.classList.add('visually-hidden');
    this. commentsLoader.classList.add('visually-hidden');
  },

  findElemets: function () {
    this.bigPictureImg = this.bigPicture.querySelector('.big-picture__img').querySelector('img');
    this.likesLabel = this.bigPicture.querySelector('.likes-count');
    this.commentsCountLabel = this.bigPicture.querySelector('.comments-count');
    this.description = this.bigPicture.querySelector('.social__caption');
    this.socialCommentsCount = this.bigPicture.querySelector('.social__comment-count');
    this.commentsLoader = this.bigPicture.querySelector('.comments-loader');
    this.picturesBlock = document.querySelector('.pictures');
  },

  deleteCommentsFunction: function (parentNode, nodesForDelete) {
    for (var i = 0; i < nodesForDelete.length; i++) {
      parentNode.removeChild(nodesForDelete[i]);
    }
  },

  openPhoto: function (index) {
    var photo = photoWindow.photoArray[index];
    photoWindow.bigPicture.classList.remove('hidden');
    photoWindow.updatePhotoInfo(photo);
    var socialComments = photoWindow.bigPicture.querySelector('.social__comments');
    var deleteComments = socialComments.querySelectorAll('li');
    photoWindow.deleteCommentsFunction(socialComments, deleteComments);
    photoWindow.showComments(photo, deleteComments[0], socialComments);
    document.addEventListener('keydown', photoWindow.onEscDown);
  },

  onEscDown: function (evt) {
    if (evt.keyCode === 27) {
      photoWindow.closePopup();
    }
  },

  onEnterDown: function (evt) {
    if (evt.keyCode === 13) {
      photoWindow.openPhoto(evt.target.someDataAttr);
    }
  },

  showPhotos: function (photoArray) {
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
      element.querySelector('a').someDataAttr = i;
      element.querySelector('img').addEventListener('click', function (evt) {
        photoWindow.openPhoto(evt.target.parentNode.someDataAttr);
      });
      element.querySelector('a').addEventListener('focus', function (evt) {
        document.addEventListener('keydown', photoWindow.onEnterDown);
      });
      element.querySelector('a').addEventListener('blur', function (evt) {
        document.removeEventListener('keydown', photoWindow.onEnterDown);
      });

      fragment.appendChild(element);
    }
    this.picturesBlock.appendChild(fragment);
  },

  getCommentsArray: function (arrayCount) {
    var commentsArray = [];
    for (var i = 0; i < arrayCount; i++) {
      var comment = {
        avatar: 'img/avatar-' + i + '/svg',
        message: COMMENTS_ARRAY[this.getRandomInt(0, COMMENTS_ARRAY.length - 1)],
        name: NAME_ARRAY[this.getRandomInt(0, NAME_ARRAY.length - 1)]
      };
      commentsArray.push(comment);
    }
    return commentsArray;
  },

  getRandomInt: function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  },

  generatePhotoArray: function (arrayCount) {
    var photoArray = [];
    for (var i = 0; i < arrayCount; i++) {
      var photoDescription = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'photos/' + (i + 1) + '.jpg',
        likes: this.getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: this.getCommentsArray(this.getRandomInt(MIN_COMMENTS, MAX_COMMENTS))
      };
      photoArray.push(photoDescription);
    }
    return photoArray;
  },

  closePopup: function () {
    photoWindow.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', photoWindow.onEscDown);
  },

  showComments: function (photo, commentTemplate, place) {
    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < photo.comments.length; i++) {
      var tempComment = commentTemplate.cloneNode(true);
      var imageComment = tempComment.querySelector('.social__picture');
      imageComment.src = 'img/avatar-' + this.getRandomInt(MIN_AVATARS, MAX_AVATARS) + '.svg';
      imageComment.alt = photo.comments[i].name;
      tempComment.querySelector('p').textContent = photo.comments[i].message;
      commentsFragment.appendChild(tempComment);
    }
    place.appendChild(commentsFragment);
  },

  init: function () {
    this.findElemets();
    this.photoArray = this.generatePhotoArray(PHOTO_COUNT);
    this.showPhotos(this.photoArray);
    this.subscribeToEvents();
  },

  subscribeToEvents: function () {
    var closeButton = this.bigPicture.querySelector('.big-picture__cancel');
    closeButton.addEventListener('click', function () {
      photoWindow.closePopup();
    });
  }

};

var mainLogic = function () {
  photoWindow.init();
};
mainLogic();
