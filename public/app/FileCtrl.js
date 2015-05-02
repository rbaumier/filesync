'use strict';
angular.module('FileSync').controller('FileCtrl', ['$scope', 'FileService', 'SocketIOService',
  function ($scope, FileService, SocketIOService) {
    this.local = '';
    this.remote = '';
    var self = this;

    SocketIOService.onFileChanged(function (filename, timestamp, content) {
      FileService.read(filename, function (err, localFile) {
        $scope.$apply(function () {
          self.local = localFile;
          self.remote = content;
        });
      });
    });
  }
]);
