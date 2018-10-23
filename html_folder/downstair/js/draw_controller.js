(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  myApp.controller_load_variable = function (){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }
  function keyDownHandler(e) {
      if(e.keyCode == 39) {
        // console.log("right pressed");
          myApp.rightPressed = true;
      }
      else if(e.keyCode == 37) {
          myApp.leftPressed = true;
      }
  }
  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          myApp.rightPressed = false;
      }
      else if(e.keyCode == 37) {
          myApp.leftPressed = false;
      }
  }
  return myApp;
}))
