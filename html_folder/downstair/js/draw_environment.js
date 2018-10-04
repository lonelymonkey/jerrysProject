(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");

  myApp.paddleHeight = 10;
  myApp.paddleWidth = 75;
  var new_y = 1000;
  var new_x =0;
  myApp.dy = 2.5;
  myApp.fps = 10;
  function load_variables (){
    myApp.canvas = $('#myCanvas')[0];
    console.log(myApp.canvas.width);
    myApp.ctx = myApp.canvas.getContext('2d');
    myApp.x_coordinate = [200,250,267,300,120,400,450,125]
    myApp.y_coordinate = [900,800,700,600,500,1000,400,300]
  }

  function draw_everything (){
    myApp.ctx.clearRect(0, 0, myApp.canvas.width, myApp.canvas.height);
    for (var i = 0; i < myApp.x_coordinate.length; i++) {
      myApp.ctx.beginPath();
      myApp.ctx.rect(myApp.x_coordinate[i], myApp.y_coordinate[i], myApp.paddleWidth, myApp.paddleHeight);
      myApp.ctx.fillStyle = "#0095DD";
      myApp.ctx.fill();
      myApp.ctx.closePath();
    }
    // console.log(dy);
    for (var i = 0; i < myApp.y_coordinate.length; i++) {
      myApp.y_coordinate[i] = myApp.y_coordinate[i] - myApp.dy;
      if (myApp.y_coordinate[i] < 10) {
          myApp.y_coordinate.splice(i,1);
          myApp.x_coordinate.splice(i,1);
          // console.log('myApp.x_coordinate',myApp.x_coordinate);
          // console.log("myApp.y_coordinate",myApp.y_coordinate);
          new_x = 20 + Math.random()*490;
          // console.log("new x = ",new_x);
          // console.log("last element ",myApp.x_coordinate[myApp.x_coordinate.length-1]);
          var boundary_high = myApp.x_coordinate[myApp.x_coordinate.length-1] +85;
          var boundary_low = myApp.x_coordinate[myApp.x_coordinate.length-1] -85;

          // while (new_x < boundary_high &&　new_x > boundary_low) {
          //   // console.log("number range is not enough");
          //   if (new_x > boundary_high) {
          //     new_x = new_x + 85;
          //   }else {
          //     new_x = new_x - 85;
          //   }
          // }

          // var new_x = 500;
          //
          // console.log("length of x",myApp.x_coordinate.length);
          // console.log("last element ",myApp.x_coordinate[myApp.x_coordinate.length-1]);

          // console.log(new_x);
          myApp.x_coordinate.push(new_x);
          myApp.y_coordinate.push(new_y);


      }
    }
    // console.log(myApp.y_coordinate);

  }
  myApp.load = function (){
    load_variables();
    // console.log(myApp.x_coordinate);
    myApp.game = setInterval(draw_everything, myApp.fps);
  }

  return myApp;
}))
