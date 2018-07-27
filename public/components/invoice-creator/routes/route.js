'use strict';
angular.module('intranet')
    .config(['stateHelperProvider',
        function (stateHelperProvider) {
            stateHelperProvider
                .state({
                    name: 'invoiceCreator',
                    url: '/invoice-creator',
                    templateUrl: 'components/invoice-creator/views/invoice-creator.html',
                    controller: 'invoiceCreatorController',
                })
               
        }]);
