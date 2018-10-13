(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");
  // global variables
  var new_y = 800;
  var new_x = 0;
  var life = 3;
  var type_stair = [0,3,0,1,3,0,2,0];
  var small_stair_width = 75;
  myApp.dy = 2.5;
  myApp.fps = 10;
  // stair object
  myApp.diffculty = 0.5;
  myApp.scale1 = 0.2;
  myApp.scale2 = 0.15;


  myApp.stair1 = {
    stair_height : 20,
    stair_width  : 150,
    defalut_color : "#0095DD",
    draw: function(x,y,type) {
      // console.log("test 2");
        // console.log("type_stair_array",type_stair);
        var output_color = "";
        var output_width = 0;
        var output_height = 0;
        if (type == 1) {
          output_color = "red";
          output_width = small_stair_width
          output_height = this.stair_height;

        }else if (type == 2) {
          output_color = "green";
          output_width = this.stair_width;
          output_height = 10;
        }  else if (type == 3) {
          output_width = 0
        }else {
          output_color = this.defalut_color;
          output_width = this.stair_width;
          output_height = this.stair_height;
        }
        myApp.ctx.beginPath();
        myApp.ctx.rect(x,y, output_width, output_height);
        myApp.ctx.fillStyle = output_color;
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
      myApp.stair1.draw(myApp.x_coordinate[i],myApp.y_coordinate[i],type_stair[i]);


    }
    // console.log(dy);
    for (var i = 0; i < myApp.y_coordinate.length; i++) {
      myApp.y_coordinate[i] = myApp.y_coordinate[i] - myApp.dy;
      if (myApp.y_coordinate[i] < 10) {
          myApp.y_coordinate.splice(i,1);
          myApp.x_coordinate.splice(i,1);
          type_stair.splice(i,1);
          var random_stair = Math.random();
          var type_of_stair = 0;
          new_x = 20 + Math.random()*850;
          if (random_stair > myApp.diffculty && random_stair < myApp.diffculty+myApp.scale1) {
            type_of_stair = 1;
          }else if (random_stair > myApp.diffculty + myApp.scale1 && random_stair < myApp.diffculty + myApp.scale1 +myApp.scale2) {
            type_of_stair = 2;
          }else if (random_stair > myApp.diffculty + myApp.scale1 +myApp.scale2) {
            type_of_stair = 3;
          }else {
            type_of_stair = 0;
          }
          // console.log('myApp.x_coordinate',myApp.x_coordinate);
          // console.log("myApp.y_coordinate",myApp.y_coordinate);
          new_x = 20 + Math.random()*850;
          // console.log("new x = ",new_x);
          // console.log("last element ",myApp.x_coordinate[myApp.x_coordinate.length-1]);
          // var boundary_high = myApp.stair1.x_coordinate[myApp.stair1.x_coordinate.length-1] +85;
          // var boundary_low = myApp.stair1.x_coordinate[myApp.stair1.x_coordinate.length-1] -85;
          myApp.x_coordinate.push(new_x);
          myApp.y_coordinate.push(new_y);
          type_stair.push(type_of_stair);

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
    if (myApp.character.y - myApp.character.radius  +5< 0) {
        alert("Game Over");
        document.location.reload();
        clearInterval(myApp.game);
    }
    // COMBAK:
    // if (myApp.character.y + myApp.character.radius < 0) {
    //   life = life - 1;
    //
    //   console.log("number of life ", life);
    //   setTimeout(function(){}, 3000);
    // }
    // if (life == 0) {
    //   alert("Game Over");
    //   document.location.reload();
    //   clearInterval(myApp.game);
    // }
    // console.log(myApp.y_coordinate);

  }
  function check_x_axis (index){
    // console.log("myApp.character.x",myApp.character.x);
    // console.log("paddle_x[index]",paddle_x[index]);
    var actual_stair_width = 0;
    if (type_stair[index] == 1) {
      actual_stair_width =small_stair_width;
    }else if (type_stair[index] == 3) {
      return true;
    }else {
      actual_stair_width = myApp.stair1.stair_width
    }

    if (myApp.character.x >myApp.x_coordinate[index] && myApp.character.x < myApp.x_coordinate[index]+actual_stair_width) {

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
    console.log("official version");
    myApp.character_load_variable();
    myApp.game = setInterval(draw_everything, myApp.fps);
  }

  return myApp;
}))
