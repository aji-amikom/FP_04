var app = angular.module("RootApp", []);

if(localStorage.getItem("id") == null){
    localStorage.setItem("id", 0);
    console.log(localStorage.getItem("id"));
}
    
app.controller('detailCourse',function($scope, $http){
    $scope.videoNow = 0;
    $scope.minVal = true;
    $http.get("db.json")
    .then(function(response) {
        id = localStorage.getItem("id");

        $scope.courses = response.data.courses[id];
        $scope.materials = response.data.courses[id].materials;
        $scope.videoId = $scope.materials[0].video;
        $scope.url = 'https://www.youtube.com/embed/'+ $scope.videoId +'?autoplay=0'
        document.getElementById('iframeid').src = $scope.url;
        document.getElementById('picture').src = $scope.courses.author.picture;
        for(materialLength in $scope.materials){}
    });
    
    $scope.changeVideo = function(id,$index){
        $scope.videoId = id;
        $scope.url = 'https://www.youtube.com/embed/'+ $scope.videoId +'?autoplay=0'
        document.getElementById('iframeid').src = $scope.url;
        $scope.videoNow = $index;
        console.log(id + ',' + $index+ ','+ $scope.videoNow); 
    }

    $scope.videoBack = function(){
        console.log($scope.videoNow);
        if($scope.videoNow <= 0){
            $scope.minVal = true;
            return;
        }
        $scope.videoNow = $scope.videoNow - 1;
        $scope.videoId = $scope.materials[$scope.videoNow].video;
        $scope.url = 'https://www.youtube.com/embed/'+ $scope.videoId +'?autoplay=0'
        document.getElementById('iframeid').src = $scope.url;
    }

    $scope.videoNext = function(){
        console.log($scope.videoNow);
        if($scope.videoNow >= materialLength){
            $scope.maxVal = true;
            return;
        }
        $scope.videoNow = $scope.videoNow + 1;
        $scope.videoId = $scope.materials[$scope.videoNow].video;
        $scope.url = 'https://www.youtube.com/embed/'+ $scope.videoId +'?autoplay=0'
        document.getElementById('iframeid').src = $scope.url;
    }
})