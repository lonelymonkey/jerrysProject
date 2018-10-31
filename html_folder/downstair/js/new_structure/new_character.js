(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  myApp.character = {
    x: 400,
    y: 100,
    vy :0.1,
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
  // myApp.character_moving = function (){
  //       // console.log("myApp.rightPressed",myApp.rightPressed);
  //       // console.log("myApp.rightPressed",myApp.rightPressed);
  //
  //   if(myApp.rightPressed && myApp.character.x < myApp.canvas.width-myApp.character.radius) {
  //       console.log("ball move right");
  //
  //       myApp.character.x += 5;
  //   }
  //   else if(myApp.leftPressed && myApp.character.x > myApp.character.radius) {
  //       console.log("ball move left");
  //
  //       myApp.character.x -= 5;
  //   }
  // }
  return myApp;
}))
