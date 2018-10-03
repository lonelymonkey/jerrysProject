(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  myApp.drawPaddle = function (){
    myApp.ctx.beginPath();
    myApp.ctx.rect(myApp.paddleX, myApp.canvas.height-myApp.paddleHeight, myApp.paddleWidth, myApp.paddleHeight);
    myApp.ctx.fillStyle = "#0095DD";
    myApp.ctx.fill();
    myApp.ctx.closePath();
  }
  myApp.paddle_load_variable = function (){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }
  function keyDownHandler(e) {
      if(e.keyCode == 39) {
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
  myApp.paddle_moving = function (){
    if(myApp.rightPressed && myApp.paddleX < myApp.canvas.width-myApp.paddleWidth) {
        myApp.paddleX += 7;
    }
    else if(myApp.leftPressed && myApp.paddleX > 0) {
        myApp.paddleX -= 7;
    }
  }
  return myApp;
}))
