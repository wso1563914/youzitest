girlApp.service('brandServices',['$http',function($http){

    this.getbrandList = function(limit, offset,successCallback,failCallBack){
        
        // $http.get('./data/brand/brandList'+listID+'offset'+offset+'limit'+limit)
        $http.get('./data/brand/brandList'+'offset'+offset+'limit'+limit)

        .success(function(data){
            // console.log(data)
             var newtop = data.data.top_text;
            var newData = data.data.item_list.map(function(item,index){
                    var newItem = {};  
                    newItem.img = item.picture;
                    newItem.name = item.sub_title;
                    newItem.ntitle =item.main_title;
                    newItem.itemt = item.item_text;        
                    return newItem;           
            })
            successCallback(newData,newtop);
        })
        .error(function(error){
            failCallBack(error)
        })

        console.log(offset);
        console.log(limit);
        
    }
}])