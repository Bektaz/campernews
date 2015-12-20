//defining twitchApp which is main and injecting ngResource module
var campNewsApp = angular.module('campNewsApp',['ngResource']);   

//defining controller
campNewsApp.controller('maincontroller',['$scope','$resource','$http',function($scope,$resource,$http){
    //array for creating bootstrap row
    $scope.counter = [];
    //array for creating bootstrap column
    $scope.ar = [];
    //temp array for zeroing every time when length of column reached 6 elemnts
    var temp = [];
    //counter wich zeroes after 6
    var k = 0;
    //number of rows
    var usersbunch = 0;
    $http({method: 'GET',url: 'http://www.freecodecamp.com/news/hot'}).then(function successCallback(response) {
    $scope.usersAPI = response.data;
    //if number of users in JSON API not exactly divided by 6
    if($scope.usersAPI.length%6!==0){
        //then the number which array lenght exactly divided by 6 is defined
        var num = Math.floor(($scope.usersAPI.length-1)/6)*6;
    }
    for(var i = 0; i<$scope.usersAPI.length; i++){
        //pushing numbers for temp array
        temp.push(i);
        k++;
        if(k===6){
           k=0;
           //when 6 reached new row is generated 
           $scope.counter.push(usersbunch);
           //bunch of numbers are pushed into ar as a subarray
           $scope.ar.push(temp);
           //temp array is emtied for next bunch of numbers
           temp = [];
           //number of row is incrmented
           usersbunch++;
        }//here the remaining numbers are pushed into ar and row number is incremented if
         //number of users from JSON API is not exactly divided by 6
        if($scope.usersAPI.length%6!==0 && i===num-1){
            $scope.counter.push(usersbunch);
            while(i>$scope.usersAPI.length-1){
               temp.push(i); 
            }
            $scope.ar.push(temp);
        }
    }
  });    
}]);