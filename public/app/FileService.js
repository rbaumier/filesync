'use strict';
angular.module('FileSync')
  .factory('FileService', function (_) {
    var files;

    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      console.error('The File APIs are not fully supported in this browser.');
    }

    // read files on every change
    document.getElementById('files').addEventListener('change', function (e) {
      files = _.toArray(e.target.files);
    }, false);

    function getFile(path) {
      return _.find(files, {
        webkitRelativePath: path
      });
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    function read(path, f) {
      var file = getFile(path);
      if (!file) {
        return console.info('You need specify your local folder in order to use the diff tool');
      }

      var reader = new FileReader();
      reader.onload = function (event) {
        f(event.target.result);
      };
      reader.readAsText(file, 'utf8');
    }

    function write(file) {

    }

    return {
      create: function (path, content) {
        return {
          path: '' || path,
          content: '' || content
        };
      },
      read: read,
      write: write
    };
  });
