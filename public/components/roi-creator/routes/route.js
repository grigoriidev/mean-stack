'use strict';
angular.module('intranet')
    .config(['stateHelperProvider',
        function (stateHelperProvider) {
            stateHelperProvider
                .state({
                    name: 'roiCreator',
                    url: '/roi-creator',
                    templateUrl: 'components/roi-creator/views/roi-creator.html',
                    controller: 'roiCreatorController',
                })
        }]);
