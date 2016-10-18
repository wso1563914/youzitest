
girlApp.controller('homeCtrl', ['$scope', '$ionicSideMenuDelegate', 'homeServices', '$ionicScrollDelegate', '$ionicSideMenuDelegate', '$timeout', '$location' ,function($scope, $ionicSideMenuDelegate, homeServices, $ionicScrollDelegate, $ionicSideMenuDelegate, $timeout, $location){
	$scope.items = [];
	$scope.navSelect = 0;
	$scope.homeList = [];
	$scope.listID = 0;
	$scope.listPage = 1;
	$scope.homeIndex = true;
	$scope.canLoadMore = true;

	
//	for(var i=0; i<10; i++){
//		$scope.items.push({i});
//	}
	
//	点击右上按钮打开导航栏
	$scope.toggleLeftSideMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};
	
//	请求banner的数据
	homeServices.getBannerList(
		function(data){
			console.log(data);
			$scope.bannerList = data.splice(1,4);
		},
		function(mes){
			console.log(mes);
		}
	)
	
//	请求导航栏的数据
	homeServices.getNavList(
		function(data){
			$scope.items = data;
			console.log(data);
			for(var i=0; i<$scope.items.length; i++){
				$scope.homeList.push([]);
			}
			
			$scope.listID = $scope.items[0].id;
			console.log($scope.items[0].id);
			console.log($scope.homeList);
			
			requestList('init');
		},
		function(mes){
			console.log(mes);
		}
	)
	
//	请求二级菜单数据
	homeServices.getHomeData(
		function(data){
			console.log(data);
			$scope.secondNavList = data.category_list;
		},
		function(mes){
			console.log(mes);
		}
	)
	
//	请求每日消息数据
	homeServices.getDayNews(
		function(data){
			console.log(data);
			$scope.dayNews = data.text_tips;
		},
		function(mes){
			console.log(mes);
		}
	)
	
	
//	请求列表数据
	function requestList(flag){
		homeServices.getList(
			$scope.listID,
			$scope.listPage,
			function(data){
				if(flag == 'init'){
					$scope.homeLists = data;
				}
				if(flag == 'refresh'){
					$scope.homeLists = [];
					$scope.homeLists = data;
					$scope.$broadcast('scroll.refreshComplete');
					console.log('刷新完成。。。');
				}
				else if(flag == 'infinite'){
					$scope.homeLists = $scope.homeLists.concat(data);
					$scope.$broadcast('scroll.infiniteScrollComplete');
					console.log('加载完成。。。');
				}
				console.log($scope.homeLists);
			},
			function(mes){
				console.log(mes)
				if(flag == 'infinite'){
					$scope.canLoadMore = false;
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}
				
				$timeout(function(){
					$scope.canLoadMore = true;
				}, 1000)
			}
		)
	}
		
	
//	下拉刷新
	$scope.refresh = function(){
		$scope.listPage = 1;
		requestList('refresh');
	}
	
//	上拉加载更多
	$scope.infinite = function(){
		$scope.listPage++;
		requestList('infinite')
	}
	
	
//	点击切换导航栏高亮
	$scope.navAction = function(index, id){
		if(index != 0){
			$scope.homeIndex = false;
		}
		else{
			$scope.homeIndex = true;
		}
		$scope.navSelect = index;
		$ionicSideMenuDelegate.toggleLeft();
		$scope.listPage = 1;
		$scope.listID = id;
		requestList('init');
		
	}
	
//	点击进入商品列表页
	$scope.itemPage = function(id){
		console.log('进入列表页。。。');
		$location.path('/itemPage/' + id)
		console.log($location)
	}
	
	
}])