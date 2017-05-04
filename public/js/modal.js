console.log('modal.js is connected');
$(function(){
  var $loginBtn = $('#open-login');
  var $signupBtn = $('#open-signup');
  var $editUserBtn = $('#edit-user');
  var $childBtn = $('#open-add-child');
  var $editActivityBtn = $('#open-edit');
  //   console.log($editActivityBtn);
  var $activityBtn = $('#activity');
  var $login = $('#login-modal');
  var $signUp = $('#signup-modal');
  var $userEdit = $('#edit-user-modal');
  var $child = $('#add-child-modal');
  var $activity = $('#activity-modal');
  var $closeBtn= $('.close');
  console.log($closeBtn);


//===============EVENT HANDLERS================/

  //Event handlers to open and close login
  var openLogin = function(){
    // console.log('Login has been clicked');
    $login.css('display', 'block');
  };
  var closeModal = function(){
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
    // console.log('create activity has been clicked');
    $activity.css('display', 'block');
  };

  //Event handlers to open and close edit activity
  var editActivity = function(){
    console.log('edit activity has been clicked');
  //   $activity.css('display', 'block');
  };

  //Event handlers to open and close edit user
  var editUser = function(){
    // console.log('edit user has been clicked');
    $userEdit.css('display', 'block');
  };

  //Event handlers to open and close add child
  var addChild = function(){
    // console.log('add child has been clicked');
    $child.css('display', 'block');
  };
//===================EVENT LISTENERS=============/
  //Event listeners for login
  $loginBtn.on('click', openLogin);
  $closeBtn.on('click', closeModal);

  //Event listeners for sign up
  $signupBtn.on('click', openSignup);
  $closeBtn.on('click', closeModal);

  //Event listeners for create activity
  $activityBtn.on('click', openActivity);
  $closeBtn.on('click', closeModal);
  //
  //
  // //Event listenersfor edit activity
  $editActivityBtn.on('click', editActivity);
  $closeBtn.on('click', closeModal);

  //Event listeners for edit user
  $editUserBtn.on('click', editUser);
  $closeBtn.on('click', closeModal);
  console.log($closeBtn);

  // //Event listeners for add child
  $childBtn.on('click', addChild);
  $closeBtn.on('click', closeModal);

});
