

girlApp.controller('itemPageCtrl', ['$scope', '$stateParams', 'homeServices', '$interval', '$location', function($scope, $stateParams, homeServices, $interval, $location){
	$scope.itemID = $stateParams.id;
	$scope.itemPage = 1;
	$scope.startTime = 0;
	$scope.endTime = 0;
	$scope.endHour = 0;
	$scope.endMin = 0;
	$scope.endSec = 0;
	
//	请求列表数据
	homeServices.getItemData(
		$scope.itemID,
		$scope.itemPage,
		function(data){
			console.log(data);
			$scope.title = data.name;  //详情列表页标题
			$scope.items = data.items;  //详情列表页商品类数据
			$scope.startTime = data.curr_time;  //获取当前时间
			$scope.endTime = data.end_time;   //结束时间
		
			
			
			
			cal($scope.endTime);
			$interval(function(){
				cal($scope.endTime);
			}, 1000)
			
		},
		function(mes){
			console.log(mes);
		}
	)

//	计算距离结束时间
	function cal(endTime){
		var part1 = endTime.split(" ")[0],
			part2 = endTime.split(" ")[1];
			
		var y = part1.split("-")[0],
			mon = part1.split("-")[1],
			day = part1.split("-")[2],
			hour = part2.split(":")[0],
			min = part2.split(":")[1],
			sec = part2.split(":")[2];
		
		var d1 = new Date();
		var d2 = new Date(y,mon-1,day,hour,min,sec)
		
		var d3 = d2.getTime() - d1.getTime();
//		console.log(d3)
//		console.log(d2)
//		console.log(mon)
//		console.log(d1)
			
		var h = parseInt(d3/1000/3600),
			m = parseInt((d3/1000/60)%60),
			s = parseInt((d3/1000)%60);
			
//		h<-9? h == h : h == '0'+h;
//		m<-9? m == m : m == '0'+m;
//		s<-9? s == s : s == '0'+s;	
			
		$scope.endHour = h;
		$scope.endMin = m;
		$scope.endSec = s;
		
	
		
		//console.log(h);
	}
	
//	点击跳转到商品详情页
	$scope.goodsInfo = function(id){
		console.log('进入详情页。。。')
		$location.path('/itemInfo/' + id)
	}
	
}])
