(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	var myApp = angular.module('myApp',['service']);
	myApp.controller('myController',['$scope','$location','MyService',function($scope,$location,MyService){
		//要展示的任务数据
		$scope.todos = MyService.get();
		$scope.$watch('todos',function(){
			MyService.save($scope.todos);
		},true);

		//添加任务
		$scope.newTodo=''  // ng-model
		$scope.add = function(){
			// 判断newTodo是否为空，为空则不添加任务
			if(!$scope.newTodo){
				return
			}

			// 把新任务添加到$scope.todos中去
			$scope.todos.push({
				id:Math.random(),
				name:$scope.newTodo,
				completed:false
			})
			// 置空
			$scope.newTodo=''
		}

	//删除任务
	$scope.remove = function(id){
      // 根据id到数组$scope.todos中查找相应元素，并删除
      for (var i = 0; i < $scope.todos.length; i++) {
        var item = $scope.todos[i]
        if(item.id === id){
          $scope.todos.splice(i,1) // 删除数据
          return
        }
      }
    }

	//修改任务
	$scope.isEditingId = -1
	$scope.edit = function(id){
		$scope.isEditingId = id
	}

	// 只是改变也文本框的编辑状态
	$scope.save = function(){
		$scope.isEditingId = -1
	}

	$scope.selectAll = false
	$scope.toggleAll = function(){
		// 让$scope.todos中所有数据的completed值等于$scope.selectAll
		for (var i = 0; i < $scope.todos.length; i++) {
			var item = $scope.todos[i]
			item.completed = $scope.selectAll
		}
	}

	$scope.getActive = function(){
		var count = 0
		// 遍历$scope.todos, 找到所有completed属性值为false的数据
		for (var i = 0; i < $scope.todos.length; i++) {
			var item = $scope.todos[i]
			if(!item.completed){
				count++
			}
		}
		return count
	}
		
	$scope.clearAll = function(){
		for (var i = $scope.todos.length - 1; i >= 0; i--) {
			// true(0),false(1),false(2)
			var item = $scope.todos[i]
			if(item.completed){
			$scope.todos.splice(i,1)
			}
		}
	}
	
	//切换不同状态任务的显示
	$scope.isCompleted = {};//filter过滤器的过滤条件
	//显示未完成的任务
	// $scope.active = function(){
	// 	$scope.isCompleted = {completed:false}
	// }

	// // 显示已完成任务
	// $scope.completed = function(){
	// 	$scope.isCompleted = {completed:true}
	// }

	// //显示所有的任务
	// $scope.all = function(){
	// 	$scope.isCompleted = {}
	// }

	$scope.loca = $location
    $scope.$watch('loca.url()',function(now, old){
      switch(now){
        case '/active':
        $scope.isCompleted = {completed:false}
        break;
        case '/completed':
        $scope.isCompleted = {completed:true}
        break;
        default:
        $scope.isCompleted = {}
      }
    })
	}]);
})(angular);
