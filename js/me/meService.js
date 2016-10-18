girlApp.service('meService',['$http', function($http){
	this.listData = function(successCb,errorCb){
		$http.get('./data/me/meListData')
		.success(function(data){
			var newlist = data.item_list[0].item_list.map(function(ele){
				return {
					brand_area_name:ele.brand_area_name,
					id:ele.id,
					name:ele.name,
					original_price:ele.original_price,
					picture:ele.picture,
					sttag_text:ele.sttag_text
				}
			})
			successCb(data.banner_list[0],data.category_list,newlist,data.item_list[0].update_msg);
		})
		.error(function(err){
			errorCb(err);
		})
	}

	this.orderList = function(successCb,errorCb){
		$http.get('./data/me/temp')
		.success(function(data){
			successCb(data);
		})
		.error(function(err){
			errorCb(err);
		})
	}
}])