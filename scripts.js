var app = angular.module('myApp', []);
app.controller('todoCtrl', function ($scope) {
    $scope.todoList = JSON.parse(localStorage.getItem("todoListLoc")) || [];
    console.log($scope.todoList);
    $scope.block = JSON.parse(localStorage.getItem("block")) || "All";

    $scope.todoAdd = function () {
        if($scope.todoInput){
            $scope.todoList.push({todoText: $scope.todoInput, done: false});
            $scope.todoInput = "";
        }

    };

    $scope.deleted = function (x) {
        $scope.todoList.splice(x, 1);
    };
    $scope.allCheck = function () {
        var a = 0;
        angular.forEach($scope.todoList, function (x) {
            if (!x.done) {
                x.done = true;
                a++
            }
        });
        if (a == 0) {
            angular.forEach($scope.todoList, function (x) {
                if (x.done) x.done = false;

            });
        }
    };
    $scope.remove = function () {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function (x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };

    $scope.saveTodoList = function () {
        var saveList = JSON.stringify($scope.todoList);
        localStorage.setItem("todoListLoc", saveList);
    };
    $scope.saveBlock = function () {
        var saveBlock = JSON.stringify($scope.block);
        localStorage.setItem("block", saveBlock);
    };

    $scope.listCompleted = function () {
        return function (items) {
            if ($scope.block == "All") {

                return true;

            } else if ($scope.block == "Completed") {

                if (items.done) {

                    return items;
                }

            } else {
                if (!items.done) {

                    return items;
                }
            }

        };
    };

});
