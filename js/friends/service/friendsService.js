girlApp.service("friendsService",[
	"$http",
	function($http){
		//
		this.getFriendsDate = function(successCallBack,faileCallBack){
			$http.get('./data/friends/myFriendsDate')
				.success(function(data){
					//console.log(data.recommend_forums);
					successCallBack(data.recommend_forums);
				})
				.error(function(){
					
				})
		};
		
		this.getFriendsImgDate = function(successCallBack,faileCallBack){
			$http.get('./data/friends/myFriendImgDate')
				.success(function(data){
					//console.log(data.data.categories);
					var newDate = data.data.categories.map(function(item,index){
						return item.subcategories.map(function(list){
							return list.icon_url;
						});
					});
					successCallBack(newDate);
				})
				.error(function(){
					
				})
		};
		
		this.getNavList = function(successCallBack,faileCallBack){
			$http.get('./data/friends/navList')
				.success(function(data){
					//console.log(data.data.categories);
					
					successCallBack(data);
				})
				.error(function(error){
					faileCallBack(error);
				})
		}
		
		this.getMoreFriendsDate = function(successCallBack,faileCallBack){
			$http.get('./data/friends/moreFriendsDate')
				.success(function(data){
					//console.log(data);
					var newDate = data.map(function(item,index){
						var obj = {};
						obj.name = item.name;
						obj.img = item.icon;
						obj.title = item.introduction;
						return obj
					})
					
					successCallBack(newDate);
				})
				.error(function(error){
					faileCallBack(error);
				})
		}
	}
])