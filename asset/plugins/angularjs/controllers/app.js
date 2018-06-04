var uri = "https://www.mocky.io/v2/5b1385443100005a0078be9e";//belum update paling baru nunggu link gambar ready

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

app.controller('registerController',function($scope){

    //define what must be check
    nama = false;
    aemail = false;
    apassword = false;
    cardName = false;
    cardNumber = false;
    cardDate = false;
    cardCvc = false;

    //the submit button
    $scope.submit = true;

    //radio choice
    $scope.plan = 'free';

    function cek(){
        if($scope.plan == 'free'){
            if(nama && aemail && apassword && ($scope.plan != undefined)){
                $scope.submit = false;
            }else{
                $scope.submit = true;
            }
        }else if($scope.plan == 'premium'){
            if(nama && aemail && apassword && cardName && cardNumber && cardDate && cardCvc && ($scope.plan != undefined)){
                $scope.submit = false;
            }else{
                $scope.submit = true;
            }
        }else{
            $scope.submit = true;
        }
    }

    $scope.planChange = function(){
        cek();   
    }

    $scope.namapanjang = '';
    $scope.$watch('namapanjang', function(namapanjang){
        if((namapanjang == undefined || namapanjang == null)){
            $scope.cssNama = 'is-danger';
            $scope.nameInvalid = true;
            nama = false;
        }else{
            $scope.cssNama = '';
            $scope.nameInvalid = false;
            nama = true;
        }
        cek();
     });

    email.value = ''
    $scope.validateEmail = function(){
        
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/.test(email.value)){
            $scope.cssEmail = "";
            $scope.emailInvalid = false;
            aemail = true;
        }else{
            aemail = false;
            $scope.cssEmail = "is-danger";
            $scope.emailInvalid = true;
        }
        cek();
    } 

    $scope.password = '';
    $scope.$watch('password', function(password){
        
        //case 1
        if((password == undefined || password == null)){
            $scope.cssPassword = 'is-danger';
            $scope.passwordInvalid = true;
            apassword = false;
        }else{
            $scope.cssPassword = '';
            $scope.passwordInvalid = false;
        }
        //case 2
        if(password == undefined){
            return;
        }
        if(password.length < 6){
            if(password.length == 0){
                return;
            }
            apassword = false;
            $scope.cssPassword = 'is-danger';
            $scope.passwordProblem = true
        }else{
            apassword = true;
            $scope.cssPassword = '';
            $scope.passwordProblem = false;
        }
        cek();
     });

     $scope.cardName = '';
     $scope.$watch('cardName', function(cardname){
         if($scope.plan == 'premium'){
            if((cardname == undefined || cardname == null)){
                $scope.cssCardName = 'is-danger';
                $scope.cardNameInvalid = true;
            }else if(cardname.length < 6){
                $scope.cssCardName = 'is-danger';
                $scope.cardNameInvalid = true;
                cardName = false;
            }else{
                $scope.cssCardName = '';
                $scope.cardNameInvalid = false;
                cardName = true;
            }
         }
         cek();
     });

     $scope.cardNumber = '';
     $scope.$watch('cardNumber', function(cardnumber){
         if($scope.plan == 'premium'){
            if((cardnumber == undefined || cardnumber == null)){
                $scope.cssCardNumber = 'is-danger';
                $scope.cardNumberInvalid = true;
            }else if(cardnumber.toString().length < 12){
                $scope.cssCardNumber = 'is-danger';
                $scope.cardNumberInvalid = true;
                cardNumber = false;
            }else{
                $scope.cssCardNumber = '';
                $scope.cardNumberInvalid = false;
                cardNumber = true;
            }
         }
         cek();
     });

     $scope.cardDate = '';
     $scope.$watch('cardDate', function(carddate){
         if($scope.plan == 'premium'){
            if((carddate == undefined || carddate == null)){
                $scope.cssCardDate = 'is-danger';
                $scope.cardDateInvalid = true;
            }else if(carddate.length < 4){
                $scope.cssCardDate = 'is-danger';
                $scope.cardDateInvalid = true;
                cardDate = false;
            }else{
                $scope.cssCardDate = '';
                $scope.cardDateInvalid = false;
                cardDate = true;
            }
         }
         cek();
     });

     $scope.cardCvc = '';
     $scope.$watch('cardCvc', function(cardcvc){
         if($scope.plan == 'premium'){
            if((cardcvc == undefined || cardcvc == null)){
                $scope.cssCardCvc = 'is-danger';
                $scope.cardCvcInvalid = true;
            }else if(cardcvc.toString().length < 4 || cardcvc.toString().length > 4){
                $scope.cssCardCvc = 'is-danger';
                $scope.cardCvcInvalid = true;
                cardCvc = false;
            }else{
                $scope.cssCardCvc = '';
                $scope.cardCvcInvalid = false;
                cardCvc = true;
            }
         }
         cek();
     });

})

app.controller('loginController',function($scope){

    surel = false;
    sandi = false;
    $scope.submitNotif = true;

    //to enable the button
    cek = function(){
        if(surel && sandi){
            $scope.submitNotif = false;
        }
    }

    email.value = ''
    $scope.validateEmail = function(){
        
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/.test(email.value)){
            $scope.cssEmail = "";
            $scope.emailInvalid = false;
            surel = true;
        }else{
            $scope.cssEmail = "is-danger";
            $scope.emailInvalid = true;
            surel = false;
        }
        cek()
    } 

    $scope.password = '';
    $scope.$watch('password', function(passwordValue){
        console.log(passwordValue);
        if(passwordValue == undefined || passwordValue == ''){
            return;
        }
        if(passwordValue.length < 6){
            $scope.passwordInvalid = true;
        }
        if(passwordValue.length > 6 || passwordValue == ''){
            $scope.cssPassword = "";
            if(passwordValue.length > 6){
                sandi = true;
                $scope.passwordInvalid = false;
            }
        } else {
            $scope.passwordInvalid = true;
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

    $scope.courseClick = function(course, courses){
        id = courses.indexOf(course);
        localStorage.setItem("id", id);
        window.location = 'course-detail.html';
    }
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

app.controller('studentBookmarkController',function($scope, $http){
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

app.controller('contactuscontroller',function($scope){

    anama = false;
    aemail = false;
    msg = false;

    $scope.submit = true;
    function cek(){
        if(anama && aemail && msg){
            $scope.submit = false;
        }else{
            $scope.submit = true;
        }
    }

    $scope.nama = '';
    $scope.$watch('nama', function(nama){
           if((nama == undefined || nama == null)){
               $scope.cssNama = 'is-danger';
               $scope.namaInvalid = true;
               anama = false;
           }else if(nama.length < 4){
               if(nama.length == 0){
                   return;
               }
               $scope.cssNama = 'is-danger';
               $scope.namaInvalid = true;
               anama = false;
           }else{
               $scope.cssNama = '';
               $scope.namaInvalid = false;
               anama = true;
           }
        cek();
    });

    email.value = ''
    $scope.validateEmail = function(){
        
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,2})+$/.test(email.value)){
            $scope.cssEmail = "";
            $scope.emailInvalid = false;
            aemail = true;
        }else{
            $scope.cssEmail = "is-danger";
            $scope.emailInvalid = true;
            aemail = false;
        }
        cek()
    };

    $scope.message = '';
    $scope.$watch('message', function(message){
           if((message == undefined || message == null)){
               $scope.cssMsg = 'is-danger';
               $scope.msgInvalid = true;
               msg = false;
           }else if(message.length < 10){
               if(message.length == 0){
                   return;
               }
               $scope.cssMsg = 'is-danger';
               $scope.msgInvalid = true;
               msg = false;
           }else{
               $scope.cssMsg = '';
               $scope.msgInvalid = false;
               msg = true;
           }
        cek();
    });

})