app.directive("navbar", function() {
    return {
        restrict: "A",
        templateUrl: 'asset/plugins/angularjs/views/navbar.html',
    };
});
app.directive("footer", function(){
    return {
        restrict: "A",
        templateUrl: 'asset/plugins/angularjs/views/footer.html',
    };
});