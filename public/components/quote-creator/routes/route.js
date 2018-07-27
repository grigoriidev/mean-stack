'use strict';
angular.module('intranet')
    .config(['stateHelperProvider',
        function (stateHelperProvider) {
            stateHelperProvider
                .state({
                    name: 'quoteCreator',
                    url: '/quote-creator',
                    templateUrl: 'components/quote-creator/views/quote-creator.html',
                    controller: 'quoteCreatorController',
                })
                .state({
                    name: 'pdfCreator',
                    url: '/pdf-creator',
                    templateUrl: 'components/quote-creator/views/pdf-creator.html',
                    controller: 'quoteCreatorController',
                })
        }]);
