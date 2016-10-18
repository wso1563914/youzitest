
girlApp.controller("friendsCtrl",[
	"$scope",
	"friendsService",
	"$ionicSlideBoxDelegate",
	function($scope,friendsService,$ionicSlideBoxDelegate){
		$scope.selectIndex =0;
		$scope.navIndex =0;
		$scope.urlArr=['views/friends/myfriends.html','views/friends/morefriends.html'];
		
		//点击获取高亮函数
		$scope.indexAction = function(index){
			$scope.selectIndex = index;
			//切换到相应的页面
			$ionicSlideBoxDelegate.slide(index);
			$scope.selectSearch = index;
		}
		//点击导航获取高亮
		$scope.navAction = function(index){
			$scope.navIndex =index;
		}
		//滑动切换页面函数
		$scope.pageChange =function(index){
			$scope.selectIndex = index;
			$scope.selectSearch = index;
		}
		//获取到列表数据
		friendsService.getFriendsDate(
			function(data){
				//console.log(data);
				$scope.nameList = data;
			},
			function(error){
				console.log(error);
			}
		);
		
		//获取到列表图片数据
		friendsService.getFriendsImgDate(
			function(data){
				//console.log(data);
				$scope.imgList = data;
			},
			function(error){
				
			}
		);
		
		//获取到导航数据
		friendsService.getNavList(
			function(data){
				//console.log(data);
				$scope.navList = data;
			},
			function(error){
				
			}
		)
		
		//获取到更多圈列表数据
		friendsService.getMoreFriendsDate(
			function(data){
				console.log(data)
				$scope.moreList = data;
			},
			function(){
				
			}
		);
	}
])