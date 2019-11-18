'use strict';

(function () {
  var TIMEOUT = 10000;
  var getData = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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
  window.network = {
    getData: getData
  };
})();
