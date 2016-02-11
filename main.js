'use strict';

var app =angular.module('routingTest', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('home', {url: '/', templateUrl: './partials/home.html'})
  .state('list', {url: '/list', templateUrl: './partials/list.html', controller: 'listCtrl'})
  .state('add', {url: '/add', templateUrl: './partials/add.html', controller: 'addCtrl'})

  $urlRouterProvider.otherwise('/')
})

app.controller('addCtrl', function($scope, $state,StockPlace,HolderOfStocks){
  console.log('aboutCtrl');
  $scope.newStock={}
  $scope.getStocks = function(){
    var stockListpull = []
    $scope.stocks = HolderOfStocks.giveArray() || [];
    stockListpull.push($scope.stocks)
    console.log('thing done',$scope.stocker);
    console.log('listP', stockListpull);
    console.log('listw', stockListpull[0].Symbol);
    var theStock = $scope.stocker.toUpperCase()
      // stockListpull[0].forEach( function(x){
      //   if (x.Symbol === theStock){
      //     return alert(`#{theStock} is already in your list.`)
      //   }
      // })
    StockPlace.gettingStock(theStock)
    .then(function(res){
      console.log('res', res.data);
      $scope.stock = res.data;
      HolderOfStocks.storeArray(res.data)
        $state.go('list')
      })
    }
})
app.controller('listCtrl', function($scope, $state, HolderOfStocks){

  console.log('listCtrl');
  $scope.stocks = HolderOfStocks.giveArray() || [];
  console.log($scope.stocks);
  $scope.keys = Object.keys;
      // $state.go('home')

  $scope.deleteName = function(value){
    console.log('obj', this.$index);
    var index = this.$index;
    console.log(index);
    HolderOfStocks.deleteFromAray(index)
  }
})

app.service("StockPlace", function($http){
  this.gettingStock = function(stock){
    console.log("IN StockPlace", stock);
    return $http.jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=`+stock+`&jsoncallback=JSON_CALLBACK`)
  }
})
app.service("HolderOfStocks", function($http){
  var stockList = []
  this.storeArray = function(stock){
    console.log("IN HolderOfStocks", stock);
    stockList.push(stock)
    return 'worked';
  }

  this.giveArray = function(){
    return stockList;
  }

  this.deleteFromAray = function (index){
    stockList.splice(index, 1);
    console.log('index', index);
    return 'worked'
  }
})

// http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=apple&jsoncallback=JSON_call
