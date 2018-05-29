var uri = "http://www.mocky.io/v2/5b0cfecc3300005200b40145";

var app = angular.module("RootApp", []);

if(localStorage.getItem("id") == null){
    localStorage.setItem("id", 0);
}
    
app.controller('detailCourse',function($scope, $http){
    $scope.videoNow = 0;
    $scope.minVal = true;
    $http.get(uri)
    .then(function(response) {
        id = localStorage.getItem("id") == null ? 0 : localStorage.getItem("id");

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
})

app.controller('loginController',function($scope){
    $scope.submitNotif = true;
    $scope.validateEmail = function(){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/.test(email.value)){
            $scope.cssEmail = "";
        }else{
            $scope.cssEmail = "is-danger";
        }
    }
    $scope.passwordNotif = false;
    $scope.password = '';
    $scope.$watch('password', function(passwordValue){
        if(passwordValue == undefined){
            return;
        }
        if(passwordValue.length > 6 || passwordValue == ''){
            $scope.cssPassword = "";
            $scope.passwordNotif = false;
        } else {
            $scope.cssPassword = "is-danger";
            $scope.passwordNotif = true;
        }
     });

    document.addEventListener('change',function(){
        console.log("change")
    })
})

app.controller('indexController',function($scope, $http){
    $http.get(uri)
    .then(function(response) {
        $scope.courses = response.data.courses;
    });
    $scope.query = function(course){
        if(course.popular == false){
            return false;
        }else{
            return true;
        }
    }
})