/**
 * Created by Administrator on 2016/10/12 0012.
 */

girlApp.controller("shoppingCartCtrl", ["$scope", "$ionicModal", "cartService", function ($scope, $ionicModal, cartService) {
    
    $scope.shops = [];
    $scope.goodsnumber = 1;
    $scope.sumPrice = "0.00";
    $scope.qckh = {checked: false};
    $scope.sumP = 0;
    $scope.picColors = [];
    $scope.fenSelect = undefined;
    $scope.selColor = undefined;

    // 初始化
    cartService.getCartDatas(function (res) {
        $scope.shops = res;
        $scope.shops.forEach(function (list) {
            list.isBj = false;
            list.checked = false;
            list.goodsInfo.forEach(function (item) {
                item.number = 1;
                item.tp = item.number * parseFloat( item.nowPrice * 100 ) / 100;
                item.picColor = item.color[0];
                $scope.picColors.push(item.color);
                item.fenSelect = 0;
            });
            $scope.asd =  list.goodsInfo
        })

    }, function (err) {
        console.log(err);
    })
    // 进入编辑
    $scope.bjActive = function (idx, list){
        var btn = document.getElementsByClassName("bj")[idx];
        if (btn.innerHTML=="编辑") {
            btn.innerHTML="完成";
        } else {
            btn.innerHTML="编辑"
            calculateMoney();
        }
        list.isBj = !list.isBj;
    }
    // 删除商品
    $scope.itemRemove = function (list, idx) {

        list.goodsInfo.splice(idx, 1);
        var listIdx = 0;
        if (list.goodsInfo.length == 0) {
            for (var i = 0; i< $scope.shops.length; i++) {
                if ($scope.shops[i] == list) {
                    listIdx = i;
                    $scope.sumP -= $scope.shops[i].tp;
                    break;
                }
            }
            $scope.shops.splice(listIdx, 1);
        }
    }
    
    // 全选判断
    $scope.listChange = listChanged;

    function listChanged(list) {
        if (list.checked) {
            list.goodsInfo.forEach(function (ele) {
                ele.checked = true;
                calculateMoney();
                console.log($scope.sumP);
            });
        } else {
            list.goodsInfo.forEach(function (ele) {
                ele.checked = false;
                $scope.qckh.checked = false;
                calculateMoney();
            })
        };
        var isAT = true;
        $scope.shops.forEach(function (list) {
            if (list.checked != true) {
                isAT = false;
            };
        });
        if (isAT) {
            $scope.qckh.checked = true;
        }
        console.log($scope.sumP)

    }

    $scope.itemChange = function (item, list) {
        var isT = false;
        if (item.checked) {
            $scope.sumP += item.tp;
        } else {
            $scope.sumP -= item.tp;
        }

        for (var i = 0; i< list.goodsInfo.length; i++) {
            if (list.checked) {
                if (list.goodsInfo[i].checked != true) {
                    list.checked = false;
                    isT = false;
                    $scope.qckh.checked = false;
                    return;
                }
            } else {
                if (list.goodsInfo[i].checked != true) {
                    isT = false;
                    $scope.qckh.checked = false;
                    return;
                }
            }
            list.checked=true;
        }

        if (isT ) {
            $scope.qckh.checked = true;
        }
    }

    $scope.selectedAll = function () {
        if ($scope.qckh.checked) {
            $scope.shops.forEach(function (list) {
                list.checked = true;
                listChanged(list);
            })
        } else  {
            $scope.shops.forEach(function (list) {
                list.checked = false ;
                listChanged(list);
                $scope.sumP = 0;
            })
        }
        console.log($scope.sumP)

    };
    
    // 添加减少 
    $scope.minus = function (n) {
        n.number--;
        if (n.number == 0) {
            n.number = 1;
        }
        n.tp = parseFloat( n.nowPrice * 100 ) / 100 * n.number
    }
    $scope.plus = function (n) {
        n.number++;
        n.tp = parseFloat(n.nowPrice * 100) / 100 * n.number;
    }

    function calculateMoney() {
        $scope.sumP = 0;
        $scope.shops.forEach(function (list) {
            list.goodsInfo.forEach(function (item) {
                if (item.checked) {
                    $scope.sumP += item.tp;
                }
            })
        })
    }

    // 颜色类型选择
    $ionicModal.fromTemplateUrl("./views/shoppingCart/cartModal.html", {
        scope : $scope,
        animation: "slide-in-up"
    }).then(function (modal) {
        $scope.modal = modal;
    })
    $scope.picColorAction = function (item) {
        $scope.modalItem = item;
        $scope.modal.show();
    }

    $scope.colorComfirm = function (color) {
        // item.picColor = color;
        $scope.modal.hide();
    }

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    $scope.modalRmAction = function () {
        $scope.modal.hide();
    };

    var selColor = undefined;

    $scope.fenAction = function (idx) {
        $scope.modalItem.fenSelect = idx;
        console.log($scope.asd)
        selColor = idx
    }

}])





























