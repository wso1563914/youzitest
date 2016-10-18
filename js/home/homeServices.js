
girlApp.service('homeServices', ['$http', function($http){
	var listData = [];
	
	
//	banner数据
	this.getBannerList = function(successCallBack, failCallBack){
		$http.get('./data/home/homeBanner')
		.success(
			function(data){
				successCallBack(data.data.banners)
			}
		)
		.error(
			function(error){
				failCallBack(error)
			}
		)
	}
	
//	导航栏数据
	this.getNavList = function(successCallBack, failCallBack){
		$http.get('./data/home/homeNavList')
		.success(function(data){
			successCallBack(data);
		})
		.error(function(error){
			failCallBack(error);
		})
	}
	
//	首页banner和二级导航栏数据
	this.getHomeData = function(successCallBack, failCallBack){
		$http.get('./data/home/homeData')
		.success(function(data){
			successCallBack(data);
		})
		.error(function(error){
			failCallBack(error);
		})
	}
	
//	首页每日消息数据
	this.getDayNews = function(successCallBack, failCallBack){
		$http.get('./data/home/homeNews')
		.success(function(data){
			successCallBack(data);
		})
		.error(function(error){
			failCallBack(error);
		})
	}
	
//	列表数据
	this.getList = function(id, listPage, successCallBack, failCallBack){
		$http.get('./data/home/homeListgroup_id' + id + 'page' + listPage + 'size20')
		.success(function(data){
			listData = data.data.item_list;
			successCallBack(data.data.item_list);
		})
		.error(function(error){
			failCallBack(error)
		})
	}
	
	
//	详情页获取所点击商品列表的详情信息
	this.getItemDataById = function(id){
		var newArr = listData.filter(function(homeList, index){
			return homeList.id == id? true : false;
		})
		console.log(newArr);
		return newArr[0];
		
	}
	
//	列表页获取所点击商品列表的数据
	this.getItemData = function(itemID, itemPage, successCallBack, failCallBack){
		$http.get('./data/home/homeItemId' + itemID + 'page' + itemPage + 'size20')
		.success(
			function(data){
				successCallBack(data);
			}
		)
		.error(
			function(error){
				failCallBack(error);
			}
		)
	}
	
//	商品详情页数据获取
	this.getItemInfo = function(infoId, successCallBack, failCallBack){
		$http.get('./data/home/homeItemInfoid' + infoId)
		.success(function(data){
			successCallBack(data.data);
		})
		.error(function(error){
			failCallBack(error);
		})
	}
	
//	商品详情页图片获取数据
	this.getItemInfoImg = function(infoId, successCallBack, failCallBack){
		$http.get('./data/home/homeItemInfoid' + infoId)
		.success(function(data){
			successCallBack(data.data.item.images);
		})
		.error(function(error){
			failCallBack(error);
		})
	}
	
	
}])