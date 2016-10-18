/**
 * Created by Administrator on 2016/10/12 0012.
 */

girlApp.service("cartService", ["$http", function ($http) {
    this.getCartDatas = function (successCb, errCb) {
        $http.get("./images/cartDatas.json")
            .success(function (res) {
                successCb(res);
            })
            .error(function (err) {
                errCb(err);
            })
    }


}]);





















