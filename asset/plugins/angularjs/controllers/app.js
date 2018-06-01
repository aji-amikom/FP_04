var uri = "http://www.mocky.io/v2/5b119dd72f0000740034f406";

var app = angular.module("RootApp", []);

if(localStorage.getItem("id") == null){
    mathId = Math.floor(Math.random() * 10);
    if(mathId <= 0){
        mathId = 1;
    }
    localStorage.setItem("id", mathId);
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

    surel = false;
    sandi = false;
    $scope.submitNotif = true;

    cek = function(){
        if(surel && sandi){
            $scope.submitNotif = false;
        }
    }

    email.value = ''
    $scope.validateEmail = function(){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/.test(email.value)){
            $scope.cssEmail = "";
            surel = true;
        }else{
            $scope.cssEmail = "is-danger";
            surel = false;
        }
        cek()
    }

    $scope.password = '';
    $scope.$watch('password', function(passwordValue){
        if(passwordValue == undefined){
            return;
        }
        if(passwordValue.length > 6 || passwordValue == ''){
            $scope.cssPassword = "";
            if(passwordValue.length > 6){
                sandi = true;
            }
        } else {
            $scope.cssPassword = "is-danger";
            sandi = false;
        }
        cek()
     });

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

    $scope.courseClick = function(course, courses){
        id = courses.indexOf(course);
        localStorage.setItem("id", id);
        window.location = 'course-detail.html';
    }
})

app.controller('courseController',function($scope, $http){
    $http.get(uri)
    .then(function(response) {
        $scope.courses = response.data.courses;
    });

})

app.controller('teacherController',function($scope, $http){
    $http.get(uri)
    .then(function(response) {
        $scope.courses = response.data.courses;
    });
    $scope.query = function(course){
        if(course.hasTeacher == false || course.hasTeacher == null || course.hasTeacher == undefined){
            return false;
        }else{
            return true;
        }
    }

    $scope.courseClick = function(course, courses){
        id = courses.indexOf(course);
        localStorage.setItem("id", id);
        window.location = '/course-detail.html';
    }
})