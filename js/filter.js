'use strict';

(function () {
  var getPopularPhoto = function () {
    var photo = window.pictures.photoArray;
    return photo;
  };
  var getRandomPhoto = function () {
    var photoArrayClone = window.util.getCloneArray(window.pictures.photoArray);
    var shufflePhotoArray = window.util.shuffle(photoArrayClone);
    return shufflePhotoArray.slice(0, 10);
  };
  var getSortPhoto = function () {
    var photoArrayClone = window.util.getCloneArray(window.pictures.photoArray);
    var sortPhotoArrayClone = photoArrayClone.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortPhotoArrayClone;
  };
  window.filter = {
    getPopularPhoto: getPopularPhoto,
    getRandomPhoto: getRandomPhoto,
    getSortPhoto: getSortPhoto
  };
})();
