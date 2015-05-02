'use strict';
angular.module('FileSync').controller('FileCtrl', ['$scope', 'FileService', 'SocketIOService',
  function ($scope, FileService, SocketIOService) {
    this.local = FileService.create();
    this.remote = FileService.create();

    var self = this;
    SocketIOService.onFileChanged(function (path, timestamp, remoteContent) {
      FileService.read(path, function (localContent) {
        $scope.$apply(function () {
          self.local = FileService.create(path, localContent);
          self.remote = FileService.create(path, remoteContent);
        });
      });
    });

    this.write = function(file) {
      FileService.write(file);
    };
  }
]);
