'use strict';
angular.module('FileSync')
  .factory('FileService', function (_) {
    var files = [];

    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      console.error('The File APIs are not fully supported in this browser.');
    }

    // update files on every change
    document.getElementById('files').addEventListener('change', function (e) {
      files = _.toArray(e.target.files);
    }, false);

    function update(filename) {
      if (!files) console.error('You need specify your local folder in order to use the application');
      if (!filename) console.error('Cannot get the remote file name');

      // only get the local file version
      var editedFile = _.find(files, {
        webkitRelativePath: filename
      });

      if (!editedFile) return console.error('A file was edited but cannot be found locally');

      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader
      var reader = new FileReader();

      reader.onload = function (e) {
        console.log(e.target.result);
      };

      reader.readAsText(editedFile, 'utf8');
    }


    function write() {}

    return {
      update: update,
      write: write
    };
  });
