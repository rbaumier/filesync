/*globals io, Visibility, _ */
'use strict';
angular.module('FileSync', ['ngAnimate', 'hljs', 'diff-match-patch']);

angular.module('FileSync')
  .constant('io', io)
  .constant('Visibility', Visibility)
  .constant('_', _);
