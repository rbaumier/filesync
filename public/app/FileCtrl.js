'use strict';
angular.module('FileSync').controller('FileCtrl', ['FileService', 'SocketIOService',
  function (FileService, SocketIOService) {
    this.left = ['first', 'second', 'third', 'fourth'].join('\n');
    this.right = ['first', 'third', 'second', 'fourth'].join('\n');

    SocketIOService.onFileChanged(function (filename /*, timestamp, content*/ ) {
      FileService.update(filename);
    });
  }
]);
