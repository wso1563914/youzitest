girlApp.controller('meCtrl', ['$rootScope','$scope','$timeout','meService','$ionicSlideBoxDelegate','$ionicScrollDelegate', function($rootScope, $scope,$timeout,meService,$ionicSlideBoxDelegate,$ionicScrollDelegate){
	$scope.tmpUrl = 'views/me/HomePage.html';
	$scope.tmpUrlKey = 'HomePage';
	$scope.check = '';
	$scope.usernameList = JSON.parse(sessionStorage.getItem('usernameList')) || {}; //获取已注册用户列表
	$scope.user = JSON.parse(sessionStorage.getItem('user'));	//检测登录状态
/*选择进入的页面*/
	$scope.title = {//    修改对应的title
		HomePage:'我', login:'登录', register:'注册', order:'我的订单', youBiBuy:'柚子币',
		topic:'话题', help:'帮助与反馈', set:'设置', details:'我的资料'
	}
	$scope.navAction = function(idx){
		var urlArr = ['login','register','order','youBiBuy','topic','help','set','HomePage','details']
		$scope.tmpUrlKey = urlArr[idx];
		$scope.tmpUrl = "views/me/"+ urlArr[idx] +".html";
		$ionicScrollDelegate.resize(); //切换页面时重新计算scroll容器
		$scope.orderWrapIdx = 0;//进入我的订单时重置所在位置
	}

	/*注册*/
	$scope.usernameCheck = function(username){	//检测用户名
		if(!(/^.{6,20}$/.test(username) && /^\w*$/.test(username)) ){
			$scope.check = '用户名格式为6-20位数字字母';
			$scope.flag1 = false;
		}else { $scope.check = ''; $scope.flag1 = true; }
	}
	$scope.passwordCheck = function(password){	//检测密码
		if( !/^[a-z0-9_-]{6,18}$/.test(password) ){
			$scope.check = '密码格式为6-18位数字字母';
			$scope.flag2 = false;
		}else { $scope.check = ''; $scope.flag2 = true; }
	}
	$scope.passwordACheck = function(password,passwordA){	//检测密码
		if(passwordA != password){
			$scope.check = '两次密码输入不一致';
			$scope.flag3 = false;
		}else { $scope.check = ''; $scope.flag3 = true; }
	}
	$scope.registerBut = function(username,password){			//注册
		if ($scope.usernameList[username]){
			$scope.check = '用户名已经被注册';
			$timeout(function(){
				$scope.check ="";
			},3000)
			return;
		}
		if($scope.flag1&&$scope.flag2&&$scope.flag3){
			$scope.usernameList[username] = {password:password,nickname:username};
			sessionStorage.setItem('usernameList',JSON.stringify($scope.usernameList));
			alert('success');
			//进入登录状态
			detection('login',username);

		}else{ alert('用户名或密码格式错误') }
	}

	/*登录*/
	$scope.loginBut = function(username,password){
		if($scope.usernameList[username]){
			if($scope.usernameList[username].password == password ){
				//进入登录状态
				detection('login',username);

			}else{
				$scope.check = '密码错误';
				$timeout(function(){
					$scope.check ="";
				},3000)
			}
			return;
		}
		$scope.check = '用户不存在';
		$timeout(function(){
			$scope.check ="";
		},3000)
	}

	/*更新登录状态*/
	function detection(flag,user){
		if(flag == 'login'){
			$scope.user = user;
			sessionStorage.setItem('user',user);
		}else if(flag = 'logout'){
			sessionStorage.removeItem('user');
			$scope.user = undefined;
		}
		$scope.navAction(7);//返回首页
	}

	/*退出登录*/
	$scope.logout = function(){
		detection('logout');
	}
	/*修改昵称重新上传个人信息*/
	$scope.changeNage = function(){
		var name = prompt('输入您新的昵称','');
		if( name != null && name != ''){
			$scope.usernameList[$scope.user].nickname = name;
			sessionStorage.setItem('usernameList',JSON.stringify($scope.usernameList));
		}
	}

	/*柚币购*/
	loading('login');
	function loading(flag){
		meService.listData(
			function(banner,nav,list,title){
				if(flag == 'login'){
					$scope.ybbanner = banner.picture_url;
					$scope.ybNav = nav;
					$scope.list = list;
					$scope.listTitle = title;	
					$scope.$broadcast('scroll.refreshComplete');	
				}
			},
			function(err){
				console.log(err);
				$scope.$broadcast('scroll.refreshComplete');
			}
		)	
	}
	
	$scope.doRefresh = function(){	// 下拉刷新
		loading('login');
	}

	/*我的订单*/
	$scope.storeChecked = [];
	$scope.goodsChecked = [];
	$scope.allCheck = [false];
	meService.orderList(
		function(data){
			$scope.carList = data.Pay;
			$scope.NotPayList = data.NotPay;
			$scope.AllGoodsList = data.all;
			$ionicSlideBoxDelegate.update();
			/*遍历创建商品和店铺的check的数组*/
			for(var i=0; i<$scope.carList.length; i++){
				$scope.storeChecked[i] = false;
				$scope.goodsChecked[i] = [];
				for(var j=0; j<$scope.carList[i].goodsInfo.length; j++ ){
					$scope.goodsChecked[i][j] =false;
				}
			}

		},function(err){
			console.log(err)
		}
	)
	/*店铺全选或取消*/
	$scope.CheckedBut = function(index){
		for(var i in $scope.goodsChecked[index]){
			$scope.goodsChecked[index][i] = $scope.storeChecked[index];
		}
		/*监测是否有全选*/
		$scope.allCheck[0] = false;
		for(j in $scope.storeChecked){
			if($scope.storeChecked[j] == false ){
				return;	
			}
		}
		$scope.allCheck[0] = true;
	}
	/*所有商品全选或取消*/
	$scope.allCheckBut = function(){
		for(i in $scope.storeChecked){
			$scope.storeChecked[i] = $scope.allCheck[0];
			for(j in $scope.goodsChecked[i]){
				$scope.goodsChecked[i][j] = $scope.allCheck[0];
			}
		}
	}
	/*监测是否有全选*/
	$scope.goodsCheckedBut = function(inx){
		$scope.storeChecked[inx] = false;
		$scope.allCheck[0] = false;
		for(i in $scope.goodsChecked[inx]){
			if($scope.goodsChecked[inx][i] == false){
				return;		
			}
		}
		$scope.storeChecked[inx] = true;
		for(j in $scope.storeChecked){
			if($scope.storeChecked[j] == false ){
				return;	
			}
		}
		$scope.allCheck[0] = true;
	}
	/*滑动我的订单切换*/
	$scope.switchSlide = function(index){
		$ionicSlideBoxDelegate.slide(index);
		$scope.orderWrapIdx = index;
	}
	$scope.sliding = function(index){
		$scope.orderWrapIdx = index;
		$ionicScrollDelegate.resize(); //切换页面时重新计算scroll容器
	}
	//$ionicSlideBoxDelegate.currentIndex()

}])
