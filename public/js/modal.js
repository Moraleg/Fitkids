console.log('modal.js is connected');
$(function(){
  var $loginBtn = $('#open-login');
  var $signupBtn = $('#open-signup');
  var $editUserBtn = $('#edit-user');
  var $childBtn = $('#open-add-child');
  var $editActivityBtn = $('#open-edit');
  var $activityBtn = $('#activity');
  var $login = $('#login-modal');
  var $signUp = $('#signup-modal');
  var $userEdit = $('#edit-user-modal');
  var $child = $('#add-child-modal');
  var $activity = $('#activity-modal');
  var $activityEdit = $('#activity-form-edit-container');
  var $closeBtn= $('.close');
  console.log($closeBtn);


//===============EVENT HANDLERS================/

  //Event handlers to open login
  var openLogin = function(){
    // console.log('Login has been clicked');
    $login.css('display', 'block');
  };

  //Event handlers to open sign up
  var openSignup = function(){
    // console.log('Sign-up has been clicked');
    $signUp.css('display', 'block');
  };

  //Event handlers to open create new activity
  var openActivity = function(){
    // console.log('create activity has been clicked');
    $activity.css('display', 'block');
  };

  //Event handlers to open edit activity
  var editActivity = function(){
    console.log('edit activity has been clicked');
    $activityEdit.css('display', 'block');
  };

  //Event handlers to open edit user
  var editUser = function(){
    // console.log('edit user has been clicked');
    $userEdit.css('display', 'block');
  };

  //Event handlers to open add child
  var addChild = function(){
    // console.log('add child has been clicked');
    $child.css('display', 'block');
  };

  //Event handler to close modals
  var closeModal = function(){
    // console.log('close has been clicked');
    $login.css('display', 'none');
    $signUp.css('display', 'none');
    $activity.css('display', 'none');
    $child.css('display', 'none');
    $activityEdit.css('display', 'none');
    $userEdit.css('display', 'none');

  };

//===================EVENT LISTENERS=============/
  //Event listeners for login
  $loginBtn.on('click', openLogin);


  //Event listeners for sign up
  $signupBtn.on('click', openSignup);


  //Event listeners for create activity
  $activityBtn.on('click', openActivity);



  //Event listenersfor edit activity
  $editActivityBtn.on('click', editActivity);


  //Event listeners for edit user
  $editUserBtn.on('click', editUser);


  //Event listeners for add child
  $childBtn.on('click', addChild);

  //Event listener to close modals
  $closeBtn.on('click', closeModal);

});
