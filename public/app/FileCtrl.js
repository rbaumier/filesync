'use strict';
angular.module('FileSync').controller('FileCtrl', ['FileService', 'SocketIOService',
  function (FileService, SocketIOService) {
    this.local = '';
    this.remote = '';

    SocketIOService.onFileChanged(function (filename, timestamp, content) {
      FileService.read(filename, function(err, localFile) {
        this.local = localFile;
        this.remote = content;
      }.bind(this));
    }.bind(this));
  }
]);
