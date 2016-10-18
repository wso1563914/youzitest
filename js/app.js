var girlApp = angular.module("girlApp", ["ionic"]);
girlApp.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider', function($stateProvider, $urlRouterProvider,$ionicConfigProvider){
	$stateProvider
	.state("home",{
		url:'/home',
		views:{
			"home":{
				templateUrl:'./views/home/home.html',
				controller:'homeCtrl'
			}
		}
	})
	.state("itemPage", {
		url:'/itemPage/:id',
		views:{
			"home":{
				templateUrl:'./views/home/itemPage.html',
				controller:'itemPageCtrl'
			}
		}
	})
	.state("itemInfo", {
		url:'/itemInfo/:id',
		views:{
			"home":{
				templateUrl:'./views/home/itemInfo.html',
				controller:'itemInfoCtrl'
			}
		}
	})
	.state("brand",{
		url:'/brand',
		views:{
			"brand":{
				templateUrl:'./views/brand/brand.html',
				controller:'brandCtrl'
			}
		}
	})
	.state("friends",{
		url:'/friends',
		views:{
			"friends":{
				templateUrl:'./views/friends/friends.html',
				controller:'friendsCtrl'
			}
		}
	})
	.state("shoppingCart",{
		url:'/shoppingCart',
		views:{
			"shoppingCart":{
				templateUrl:'./views/shoppingCart/shoppingCart.html',
				controller:'shoppingCartCtrl'
			}
		}
	})
	.state("me",{
		url:'/me',
		views:{
			"me":{
				templateUrl:'./views/me/me.html',
				controller:'meCtrl'
			}
		}
	})
	$urlRouterProvider.otherwise('/home');

	/*配置全局样式*/
	$ionicConfigProvider.platform.ios.tabs.style("standard");
	$ionicConfigProvider.platform.android.tabs.style("standard");
	$ionicConfigProvider.platform.ios.tabs.position("bottom");
	$ionicConfigProvider.platform.android.tabs.position("bottom");
	$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
	$ionicConfigProvider.platform.android.navBar.alignTitle('center');
	
	$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-chevron-left');
	
	$ionicConfigProvider.views.transition('none');
}])

girlApp.run(["$rootScope", function($rootScope){
	$rootScope.canShowTab = true;
}])





















