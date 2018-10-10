(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");
  /// TEMP:
  paddle_x = [90,400,600];
  paddle_y = [125,400,600];
  stair_length = 200;

  function load_variables (){
    myApp.canvas = $('#myCanvas')[0];
    // console.log(canvas);
    myApp.ctx = myApp.canvas.getContext('2d');

  }
  function check_x_axis (index){
    // console.log("myApp.character.x",myApp.character.x);
    // console.log("paddle_x[index]",paddle_x[index]);
    if (myApp.character.x >paddle_x[index] && myApp.character.x < paddle_x[index]+stair_length) {
      console.log("not falling cuz it stands on the stair");
      // myApp.character.y = paddle_y[index];
      return false;
    }else {
      return true;
    }
  }
  function check_y_axis (){
    for (var i = 0; i < paddle_y.length; i++) {
      // console.log("myApp.character.y ",myApp.character.y );
      // console.log("paddle_y[i] + myApp.character.radius ",paddle_y[i] + myApp.character.radius );
      console.log("character's bottom",myApp.character.y + myApp.character.radius);
      console.log("paddle_y[i]",paddle_y[i]);

      if (myApp.character.y + myApp.character.radius < paddle_y[i] + 10 && myApp.character.y + myApp.character.radius > paddle_y[i] - 10) {
        return [true,i];
      }
    }
    return [false];
  }
  function draw(){
    var y_onstair = false;
    var y_onstair = false;
    myApp.ctx.clearRect(0, 0, myApp.canvas.width, myApp.canvas.height);
    myApp.character.draw();
    // TEMP:
    for (var i = 0; i < paddle_x.length; i++) {
      myApp.ctx.beginPath();
      myApp.ctx.rect(paddle_x[i], paddle_y[i], stair_length, 10);
      myApp.ctx.fillStyle = "#0095DD";
      myApp.ctx.fill();
      myApp.ctx.closePath();
    }
    y_onstair = check_y_axis();
    console.log("y_onstair",y_onstair);
    if(y_onstair[0]){
      y_onstair = check_x_axis(y_onstair[1]);
      if (y_onstair) {
        console.log("falling x not in the stair range");
        falling ();
      }
    }else {
      console.log("falling cuz not stair");
      falling ();
    }
  }

  function falling (){
    myApp.character.y += myApp.character.vy;
    myApp.character.vy *= .99;
    myApp.character.vy += .25;
  }
  myApp.load = function (){
    load_variables();
    myApp.character_load_variable();
    setInterval(draw, 10);
  }

  return myApp;
}))
