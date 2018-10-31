(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  function keyDownHandler(e) {
      if(e.keyCode == 39) {
        // console.log("right pressed");
          controller.rightPressed = true;
      }
      else if(e.keyCode == 37) {
          controller.leftPressed = true;
      }
  }
  function keyUpHandler(e) {
      if(e.keyCode == 39) {
          controller.rightPressed = false;
      }
      else if(e.keyCode == 37) {
          controller.leftPressed = false;
      }
  }
  const controller = {
    controller_load_variable : function (){
      document.addEventListener("keydown", keyDownHandler, false);
      document.addEventListener("keyup", keyUpHandler, false);
    },
    rightPressed : false,
    leftPressed : false,
  };
  myApp.controller = controller;
  return myApp;

}))
