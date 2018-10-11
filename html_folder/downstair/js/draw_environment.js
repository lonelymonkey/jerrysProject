(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");
  // global variables
  var new_y = 800;
  var type_stair = 0;
  var new_x =0;
  myApp.dy = 2.5;
  myApp.fps = 10;
  // stair object
  myApp.stair1 = {
    stair_height : 20,
    stair_width  : 150,
    color : "#0095DD",
    draw: function(x,y) {
      // console.log("test 2");
        myApp.ctx.beginPath();
        myApp.ctx.rect(x,y, this.stair_width, this.stair_height);
        myApp.ctx.fillStyle = this.color;
        myApp.ctx.fill();
        myApp.ctx.closePath();

    }
  }
  myApp.paddleHeight = 20;
  myApp.paddleWidth = 150;

  myApp.x_coordinate = [200,250,267,300,120,400,450,125]
  myApp.y_coordinate = [900,800,700,600,500,1000,400,300]

  function load_variables (){
    myApp.canvas = $('#myCanvas')[0];
    // console.log(myApp.canvas.width);
    myApp.ctx = myApp.canvas.getContext('2d');

  }

  function draw_everything (){
    var y_onstair = false;
    var x_onstair = false;
    myApp.ctx.clearRect(0, 0, myApp.canvas.width, myApp.canvas.height);
    myApp.character.draw();
    for (var i = 0; i < myApp.x_coordinate.length; i++) {
      myApp.stair1.draw(myApp.x_coordinate[i],myApp.y_coordinate[i]);

    }
    // console.log(dy);
    for (var i = 0; i < myApp.y_coordinate.length; i++) {
      myApp.y_coordinate[i] = myApp.y_coordinate[i] - myApp.dy;
      if (myApp.y_coordinate[i] < 10) {
          myApp.y_coordinate.splice(i,1);
          myApp.x_coordinate.splice(i,1);
          // console.log('myApp.x_coordinate',myApp.x_coordinate);
          // console.log("myApp.y_coordinate",myApp.y_coordinate);
          new_x = 20 + Math.random()*850;
          // console.log("new x = ",new_x);
          // console.log("last element ",myApp.x_coordinate[myApp.x_coordinate.length-1]);
          // var boundary_high = myApp.stair1.x_coordinate[myApp.stair1.x_coordinate.length-1] +85;
          // var boundary_low = myApp.stair1.x_coordinate[myApp.stair1.x_coordinate.length-1] -85;
          myApp.x_coordinate.push(new_x);
          myApp.y_coordinate.push(new_y);
      }
    }
    // console.log("myApp.character.y before the check",myApp.character.y);

    y_onstair = check_y_axis();
    // console.log("y_onstair",y_onstair);
    if(y_onstair[0]){
      x_onstair = check_x_axis(y_onstair[1]);
      if (x_onstair) {
        // console.log("falling x not in the stair range");
        falling ();
      }else {
        myApp.character.y = myApp.character.y-myApp.dy;
      }
    }else {
      // console.log("falling cuz not stair");
      falling ();
    }
    // console.log("myApp.character.y after the check",myApp.character.y);

    if (myApp.character.y > myApp.canvas.height) {
      alert("Game Over");
      document.location.reload();
      clearInterval(myApp.game);

    }
    // console.log(myApp.y_coordinate);

  }
  function check_x_axis (index){
    // console.log("myApp.character.x",myApp.character.x);
    // console.log("paddle_x[index]",paddle_x[index]);
    if (myApp.character.x >myApp.x_coordinate[index] && myApp.character.x < myApp.x_coordinate[index]+myApp.stair1.stair_width) {

      return false;
    }else {
      return true;
    }
  }
  function check_y_axis (){
    for (var i = 0; i < myApp.y_coordinate.length; i++) {
      // console.log("myApp.character.y + myApp.character.radius",myApp.character.y + myApp.character.radius);
      // console.log("-10",myApp.y_coordinate[i] -10 );
      // console.log("+10",myApp.y_coordinate[i] +10 );

      if (myApp.character.y + myApp.character.radius < myApp.y_coordinate[i] + 10 && myApp.character.y + myApp.character.radius > myApp.y_coordinate[i] - 10) {
        return [true,i];
      }
    }
    return [false];
  }

  function falling (){
    myApp.character.y += myApp.character.vy;
    myApp.character.vy *= .99;
    myApp.character.vy += .075;
  }
  myApp.load = function (){
    load_variables();
    console.log("new structure of stairs");
    myApp.character_load_variable();
    myApp.game = setInterval(draw_everything, myApp.fps);
  }

  return myApp;
}))
