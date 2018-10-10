(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  myApp.character = {
    x: 100,
    y: 100,
    vy :5,
    radius: 25,
    color: 'blue',
    draw: function() {
      // console.log("test 2");
      myApp.ctx.beginPath();
      myApp.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      myApp.ctx.closePath();
      myApp.ctx.fillStyle = this.color;
      myApp.ctx.fill();
      myApp.character_moving();
    }
  };
  myApp.drawPaddle = function (){
    myApp.ctx.beginPath();
    myApp.ctx.rect(myApp.paddleX, myApp.canvas.height-myApp.paddleHeight, myApp.paddleWidth, myApp.paddleHeight);
    myApp.ctx.fillStyle = "#0095DD";
    myApp.ctx.fill();
    myApp.ctx.closePath();
  }
  myApp.character_load_variable = function (){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
  }
  function keyDownHandler(e) {
      if(e.keyCode == 39) {
        // console.log("right pressed");
          myApp.rightPressed = true;
      }
      else if(e.keyCode == 37) {
        // console.log("left pressed");

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
  myApp.character_moving = function (){
        // console.log("myApp.rightPressed",myApp.rightPressed);
        // console.log("myApp.rightPressed",myApp.rightPressed);

    if(myApp.rightPressed && myApp.character.x < myApp.canvas.width-myApp.character.radius) {
        console.log("ball move right");

        myApp.character.x += 7;
    }
    else if(myApp.leftPressed && myApp.character.x > myApp.character.radius) {
        console.log("ball move left");

        myApp.character.x -= 7;
    }
  }
  return myApp;
}))
