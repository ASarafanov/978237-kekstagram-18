'use strict';

(function () {
  var TIMEOUT = 10000;
  var STATUS_OK = 200;

  var getData = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('код: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('timeout', function () {
      onError('превышено время ожидания сервера');
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.send();
  };

  var postData = function (data, url, onSuccessPost, onErrorPost) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('POST', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccessPost(xhr.response);
      } else {
        onErrorPost('код: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('timeout', function () {
      onErrorPost('превышено время ожидания сервера');
    });
    xhr.addEventListener('error', function () {
      onErrorPost('Произошла ошибка соединения');
    });
    xhr.send(data);
  };

  window.network = {
    postData: postData,
    getData: getData
  };
})();
