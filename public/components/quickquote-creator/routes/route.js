'use strict';
angular.module('intranet')
    .config(['stateHelperProvider',
        function (stateHelperProvider) {
            stateHelperProvider
                .state({
                    name: 'quickquoteCreator',
                    url: '/quickquote-creator',
                    templateUrl: 'components/quickquote-creator/views/quickquote-creator.html',
                    controller: 'quickquoteCreatorController',
                })
               
        }]);
