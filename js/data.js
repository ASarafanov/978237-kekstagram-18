'use strict';

(function () {
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

  var generatePhotoArray = function (arrayCount) {
    var photoArray = [];
    for (var i = 0; i < arrayCount; i++) {
      var photoDescription = {
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'photos/' + (i + 1) + '.jpg',
        likes: window.util.getRandomInt(MIN_LIKES, MAX_LIKES),
        comments: getCommentsArray(window.util.getRandomInt(MIN_COMMENTS, MAX_COMMENTS))
      };
      photoArray.push(photoDescription);
    }
    return photoArray;
  };

  var getCommentsArray = function (arrayCount) {
    var commentsArray = [];
    for (var i = 0; i < arrayCount; i++) {
      var comment = {
        avatar: 'img/avatar-' + i + '/svg',
        message: COMMENTS_ARRAY[window.util.getRandomInt(0, COMMENTS_ARRAY.length - 1)],
        name: NAME_ARRAY[window.util.getRandomInt(0, NAME_ARRAY.length - 1)]
      };
      commentsArray.push(comment);
    }
    return commentsArray;
  };
  var photoArray = generatePhotoArray(PHOTO_COUNT);
  window.data = {
    photoArray: photoArray
  };

})();
