
girlApp.controller('itemInfoCtrl', ['$scope', '$stateParams', 'homeServices', function($scope, $stateParams, homeServices){
	$scope.allImgSrc = 0;
	$scope.price = 128.0;
	$scope.discountPrice = 49.0;
	
	
//	全部数据请求
	homeServices.getItemInfo(
		$stateParams.id,
		function(data){
			console.log(data);
			$scope.itemTitles = data.item.title; //获取标题信息
		},
		function(mes){
			console.log(mes);
		}
	)
	
	
//	图片请求数据
	homeServices.getItemInfoImg(
		$stateParams.id,
		function(data){
			console.log(data);
			$scope.allImgSrc = data;
		},
		function(mes){
			console.log(mes);
		}
	)
	
}])
