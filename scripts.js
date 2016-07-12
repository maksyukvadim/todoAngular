var app = angular.module('myApp', ['ngResource', 'ngMaterial']);

app.controller('todoCtr', ['$scope', 'translationService', function ($scope, translationService) {
    $scope.todoList = JSON.parse(localStorage.getItem("todoListLoc")) || [];
    $scope.filter = JSON.parse(localStorage.getItem("filter")) || "All";
    $scope.langs = ['en', 'ru'];
    $scope.lang = 'en';
    $scope.todoAdd = function () {
        if ($scope.todoInput) {
            $scope.todoList.push({todoText: $scope.todoInput, done: false});
            $scope.todoInput = "";
        }
        $scope.saveTodoList();
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

    $scope.removeAll = function () {
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

    $scope.saveFilter = function () {
        var saveFilter = JSON.stringify($scope.filter);
        localStorage.setItem("filter", saveFilter);
    };

    $scope.listItem = function () {
        return function (items) {
            if ($scope.filter == "All") {
                return true;
            } else if ($scope.filter == "Completed") {
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

    $scope.translate = function () {
        translationService.getTranslation($scope, $scope.lang);
    };
    $scope.$watch('lang', function () {
        $scope.translate();
    });
    $scope.$watch('filter', function () {
        $scope.saveFilter();
    });

}]);

app.service('translationService', function ($resource) {

    this.getTranslation = function ($scope, language) {
        var languageFilePath = 'translation_' + language + '.json';
        console.log(languageFilePath);
        $resource(languageFilePath).get(function (data) {
            $scope.translation = data;
        });
    };
});


