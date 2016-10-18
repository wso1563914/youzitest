girlApp.controller('brandCtrl',['$scope','brandServices','$timeout',function($scope, brandServices,$timeout){
        
        $scope.limit = 20;
        $scope.offset = 0;
        $scope.canLoadMore = true;
       
        requestList();

    function requestList(flag){
        brandServices.getbrandList(
                $scope.limit,
                $scope.offset,
            function(data,newtop){
                   if(flag == 'refresh'){
                    
                    $scope.$broadcast('scroll.refreshComplete');
                   }
                   else if(flag == 'loadMore'){
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }
                   
                $scope.listData = data;
                $scope.topData = newtop;
                
                console.log($scope.listData.length )
             // console.log(newtop)
        },
            function(mes){
                        console.log(mes);
                if(flag == 'refresh'){
                        $scope.$broadcast('scroll.refreshComplete');
                    }
                else if(flag == 'loadMore'){
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                            $scope.canLoadMore = false;

                             $timeout(function(){
                                console.log("kk");
                            $scope.canLoadMore = true;
                        },1000);
                    }
            }
        );
    }
        //下拉列表
        $scope.refresh = function(){

            $scope.limit = 20;
            $scope.offset = 0;
            requestList('refresh');
        }

        //上来刷新
        $scope.loadMore = function(){
            console.log('上拉加载更多.........');

            $scope.offset += $scope.listData.length;
            console.log("1+"+$scope.listData.length)
            requestList('loadMore');

        }

   

}])
