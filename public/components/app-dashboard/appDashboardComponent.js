//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//getUser, getAdminUser, updateTask, adminupdateTask
'use strict';
angular.module('intranet')
.controller('dashbaordController', ['$scope','$rootScope','$state','services','$timeout',
	function($scope, $rootScope,$state,services, $timeout) {
        console.log($scope.isLogin);
        $scope.superadmin = false;
        services.http({
			method:'GET',
			url: window._API_PATH.getUser,
			params:{userId: $state.params.id,_id:$rootScope.isLogin._id, email: $scope.isLogin.email}
		}).then( res => {
            $scope.user= res.data ;
            $scope.tasks= res.data.task;
            console.log($scope.user);
            $scope.superadmintask = $scope.tasks[0];
            console.log($scope.superadmintask);
            console.log($scope.tasks);
            $scope.usertasks = [];
            for(var i=0; i<$scope.tasks.length; i++) {
                if(i != 0) {
                    ($scope.usertasks).push($scope.tasks[i]);
                }
                
            }
            if($scope.user.usertype == "superadmin") $scope.superadmin = true;
			$timeout(() => { $scope.isPageLoading =false;}, 300);

		}).catch(err => {
			$timeout(() => { $scope.isPageLoading =false;}, 300);
			history.go(-1);
			services.notify(services.getError(err).message , 'error');
        });

        // getadmin Userinfo
        services.http({
			method:'GET',
            url: window._API_PATH.getAdminUser,
            params:{userId: $state.params.id,_id:$rootScope.isLogin._id, email: $scope.isLogin.email}
		}).then( res => {
            $scope.user= res.data ;
            $scope.admintasks= res.data.admintask;
        
            if($scope.user.usertype == "superadmin") $scope.superadmin = true;
			$timeout(() => { $scope.isPageLoading =false;}, 300);

		}).catch(err => {
			$timeout(() => { $scope.isPageLoading =false;}, 300);
			history.go(-1);
			services.notify(services.getError(err).message , 'error');
        });

		$scope.dashboardChart1 = {
        "type": "ColumnChart",
        "data": [
            ['Month', 'PageView', 'Average'],
            ['Jan', 998, 614.6],
            ['Feb', 1268, 682],
            ['Mar', 807, 623],
            ['Apr', 968, 609.4],
            ['May', 1026, 569.6]
        ],
        "options": {
            title: 'Monthly PageView',
            vAxis: { title: 'PageView' },
            hAxis: { title: 'Month' },
            seriesType: 'bars',
            series: { 1: { type: 'line' } },
            legend: { position: 'bottom' }
        }
    };

    //  Monthly users charts
    $scope.dashboardChart2 = {
        "type": "ColumnChart",
        "data": [
            ['Month', 'PageView', 'Average'],
            ['Jan', 938, 614.6],
            ['Feb', 1120, 682],
            ['Mar', 1167, 623],
            ['Apr', 615, 609.4],
            ['May', 629, 569.6]
        ],
        "options": {
            title: 'Monthly Users',
            vAxis: { title: 'Users' },
            hAxis: { title: 'Month' },
            legend: { position: 'bottom' },
            isStacked: true
        }
    };

    //  Monthly bounce rate
    $scope.dashboardChart3 = {
        "type": "PieChart",
        "data": [
            ['Month', 'Bounce Rate'],
            ['Jan', 614.6],
            ['Feb', 682],
            ['Mar', 623],
            ['Apr', 609.4],
            ['May', 569.6]
        ],
        "options": {
            title: 'Monthly Bounce Rate',
            is3D: true,
        }
    };

    //  Sessions by county
    $scope.dashboardChart4 = {
        "type": "GeoChart",
        "data": [
            ['Country', 'Sessions'],
            ['Germany', 200],
            ['United States', 300],
            ['Brazil', 400],
            ['Canada', 500],
            ['France', 600],
            ['RU', 700]
        ],
        "options": {}
    };

    var data = {};

    $scope.updateTask = function(task){
    
        data = {
            email: $rootScope.isLogin.email,
            data: task
        }
        console.log(data);
        services.http({
            method:'POST',
            url: window._API_PATH.updateTask,
            data: data,
        })
        .then( res => {
            $scope.isLoading = false;
            $scope.alert={type:'success',message:res.message};
            $scope.user={};
            form.$setPristine();form.$setUntouched();
           
        })
        .catch(err => {
            //define error
            $scope.isLoading = false;
            $scope.alert=services.getError(err);
        });

    }

    $scope.deleteTask = function(){
        console.log('remove box');
    }
//admin functions
    $scope.adminupdateTask = function(task) {
        data = {
            email: $rootScope.isLogin.email,
            data: task
        }
        console.log(data);
        services.http({
            method:'POST',
            url: window._API_PATH.adminupdateTask,
            data: data,
        })
        .then( res => {
            $scope.isLoading = false;
            $scope.alert={type:'success',message:res.message};
            $scope.user={};
            form.$setPristine();form.$setUntouched();
           
        })
        .catch(err => {
            //define error
            $scope.isLoading = false;
            $scope.alert=services.getError(err);
        });
    }

    $scope.admindeleteTask = function() {
        console.log('admindelete');
    }

    // $scope.dragControlListeners = {
    //     accept: function (sourceItemHandleScope, destSortableScope) {
    //         return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    //       },//override to determine drag is allowed or not. default is true.
    //     itemMoved: function (eventObj) {

    //         var moveSuccess, moveFailure;
    //         /**
    //          * Action to perform after move success.
    //          */
    //         moveSuccess = function() {};
    
    //         /**
    //          * Action to perform on move failure.
    //          * remove the item from destination Column.
    //          * insert the item again in original Column.
    //          */
    //         moveFailure = function() {   
    //             eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
    //             eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.item);
    //         };
    //     },
    //     orderChanged: function(event) {},
    //     containment: '#board',//optional param.
    //     clone: true, //optional param for clone feature.
    //     allowDuplicates: false //optional param allows duplicates to be dropped.
    // };
    
    // $scope.dragControlListeners1 = {
    //         containment: '#board',//optional param.
    //         allowDuplicates: true //optional param allows duplicates to be dropped.
    // };
    // $scope.items = ["one", "two", "three", "four", "five", "six"];
	
}]);
//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
