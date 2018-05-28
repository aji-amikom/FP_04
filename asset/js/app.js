console.log('app.js loaded');
$('#teacher-login').hide();
$('#student-tab').on('click', function(){
    if(!$(this).hasClass('is-active')){
        $(this).toggleClass('is-active');
        $('#teacher-tab').toggleClass('is-active','');    
    }
    $('#teacher-login').hide();
    $('#student-login').show('slow');
})

$('#teacher-tab').on('click', function(){
    if(!$(this).hasClass('is-active')){
        $(this).toggleClass('is-active');
        $('#student-tab').toggleClass('is-active','');
    }
    $('#student-login').hide();
    $('#teacher-login').show('show');
})