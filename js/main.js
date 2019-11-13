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

var getCommentsArray = function (arrayCount) {
  var commentsArray = [];
  for (var i = 0; i < arrayCount; i++) {
    var comment = {
      avatar: 'img/avatar-' + i + '/svg',
      message: COMMENTS_ARRAY[getRandomInt(0, COMMENTS_ARRAY.length - 1)],
      name: NAME_ARRAY[getRandomInt(0, NAME_ARRAY.length - 1)]
    };
    commentsArray.push(comment);
  }
  return commentsArray;
};

var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var generatePhotoArray = function (arrayCount) {
  var photoArray = [];
  for (var i = 0; i < arrayCount; i++) {
    var photoDescription = {
      url: 'photos/' + (i + 1) + '.jpg',
      description: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInt(MIN_LIKES, MAX_LIKES),
      comments: getCommentsArray(getRandomInt(MIN_COMMENTS, MAX_COMMENTS))
    };
    photoArray.push(photoDescription);
  }
  return photoArray;
};

var showPhotos = function (photoArray) {
  var template = document.querySelector('#picture');
  var content = template.content;
  var picturesBlock = document.querySelector('.pictures');
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
    fragment.appendChild(element);
  }

  picturesBlock.appendChild(fragment);
};

var getBigPicture = function () {
  var bigPicture = document.querySelector('.big-picture');
  return bigPicture;
};

var getFirstPhoto = function (photoArray) {
  var photoObject = photoArray[0];
  return photoObject;
};

var updatePhotoInfo = function (bigPicture, photoObject) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photoObject.url;
  bigPicture.querySelector('.likes-count').textContent = photoObject.likes;
  bigPicture.querySelector('.comments-count').textContent = photoObject.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photoObject.description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
};

var deleteCommentsFunction = function (parentNode, nodesForDelete) {
  for (var i = 0; i < nodesForDelete.length; i++) {
    parentNode.removeChild(nodesForDelete[i]);
  }
};

var showComments = function (photo, commentTemplate, place) {
  var commentsFragment = document.createDocumentFragment();

  for (var i = 0; i < photo.comments.length; i++) {
    var tempComment = commentTemplate.cloneNode(true);
    var imageComment = tempComment.querySelector('.social__picture');
    imageComment.src = 'img/avatar-' + getRandomInt(MIN_AVATARS, MAX_AVATARS) + '.svg';
    imageComment.alt = photo.comments[i].name;
    tempComment.querySelector('p').textContent = photo.comments[i].message;
    commentsFragment.appendChild(tempComment);
  }

  place.appendChild(commentsFragment);
};

var mainLogic = function () {
  var photoArray = generatePhotoArray(PHOTO_COUNT);
  showPhotos(photoArray);
  var bigPicture = getBigPicture();
  bigPicture.classList.remove('hidden');
  var photoObject = getFirstPhoto(photoArray);
  updatePhotoInfo(bigPicture, photoObject);
  var socialComments = bigPicture.querySelector('.social__comments');
  var deleteComments = socialComments.querySelectorAll('li');
  deleteCommentsFunction(socialComments, deleteComments);
  showComments(photoObject, deleteComments[0], socialComments);
};

mainLogic();
