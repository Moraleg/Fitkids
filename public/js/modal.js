console.log('modal.js is connected');
$(function(){
  var $loginBtn = $('#open-login');
  var $signupBtn = $('#open-signup');
  var $childBtn = $('#open-add-child');
  console.log($childBtn);
  var $editActivityBtn = $('#open-edit');
  var $activityBtn = $('#activity');
  console.log($activityBtn);
  var $login = $('#login-modal');
  var $signUp = $('#signup-modal');
  var $child = $('#edit-user-modal')
  var $activity = $('#activity-modal');
  var $closeBtn= $('.close');


//===============EVENT HANDLERS================/

  //Event handlers to open and close create new activity
  var editActivity = function(){
    console.log('edit activity has been clicked');
    // $activity.css('display', 'block');
  };

  //Event handlers to open and close login
  var openLogin = function(){
    // console.log('Login has been clicked');
    $login.css('display', 'block');
  };
  var closeModal= function(){
    // console.log('close has been clicked');
    $login.css('display', 'none');
    $signUp.css('display', 'none');
    $activity.css('display', 'none');
    $child.css('display', 'none');
  };

  //Event handlers to open and close sign up
  var openSignup = function(){
    // console.log('Sign-up has been clicked');
    $signUp.css('display', 'block');
  };

  //Event handlers to open and close create new activity
  var openActivity = function(){
    console.log('create activity has been clicked');
    // $activity.css('display', 'block');
  };


//===================EVENT LISTENERS=============/
  //Event listeners for login
  $loginBtn.on('click', openLogin);
  $closeBtn.on('click', closeModal);

  //Event handlers for sign up
  $signupBtn.on('click', openSignup);
  $closeBtn.on('click', closeModal);

  // //Event handlers for sign up
  // $activityBtn.on('click', openActivity);
  // $closeBtn.on('click', closeModal);
  //
  //
  // //Event handlers for edit activity
  // $editActivityBtn.on('click', editActivity);
  // $closeBtn.on('click', closeModal);
});
