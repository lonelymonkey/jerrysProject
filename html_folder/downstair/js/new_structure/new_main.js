(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");
  // global variables
  const model = {
    ui : {
      stair : [],
      player :[]
    }
  }
  const config = {
    num_stair : 10,
    stair_unit : 35,
    stair_height :10,
    speed : 3,
    fps : 10,
    max_stair : 8,
    num_player : 1,
    falling_speed : 0.8,
    player_speed : 5,
    player_size : 25,
    tolerance : 5,
  };
  const stair_config = [
    {
      stair_height : 0,
      color : " red",
      stair_length :0


    },
    {
      stair_height : 5,
      color : "blue",
      stair_length :5

    },
    {
      stair_height : 10,
      color : " red"
    }
  ];
  const game_management = {
    game_over : false
  };
  let canvas;
  let ctx;
  let game;
  let view_constructor;
  function main_load_canvas (){
    myApp.canvas = $('#myCanvas')[0];
    canvas = myApp.canvas;
    // console.log(myApp.canvas.width);
    myApp.ctx = myApp.canvas.getContext('2d');
    ctx = myApp.ctx;

  }
  function main_load_controller(){
    // myApp.controller_load_variable();
  }

  // function draw_stair(){
  //   myApp_stair.draw();
  // }
  // function draw_character(){
  //   myApp.character.draw();
  // }
  function main_process (){
    myApp.process();
  }
  function main_draw(){
    // console.log("start drawing ");
    if(game_management.game_over){
      var r = confirm("Game Over ! restart ?");
      if (r) {
        document.location.reload();
        clearInterval(game);
      }else {
        // COMBAK: go to homepage feature (after implement staring page);
        console.log("go to home page");
        clearInterval(game);

      }

    }
    view_constructor = new render();
    view_constructor.draw(model,canvas,ctx);
    // console.log("canvas",canvas);
    myApp.processor.update(model,canvas,ctx,config,game_management,stair_config);
    // console.log("myApp.controller.rightPressed",myApp.controller.rightPressed);
    // console.log("myApp.controller.leftPressed",myApp.controller.leftPressed);


  }
  function randomInteger( min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  function main(){
    // main_draw();
    game = setInterval(main_draw, config.fps);
  }
  function main_load_character_img(){

  }
  function initialize_view(){
    //  we generate stair object first
    let stair_config = [];
    for (var i = 0; i < config.num_stair; i++) {
      let stair_len = randomInteger(3,5);
      let x = randomInteger(0,myApp.canvas.width - config.stair_unit * stair_len);
      let y = (i + 1 )* 100;
      stair_config.push({ x:x,
                          y:y,
                          length:stair_len,
                          color:"red",
                          height :config.stair_height,
                          dy :  config.speed,
                          unit_length : config.stair_unit
                        });
    }
    let stair_gen = new generate_stair(config.num_stair,stair_config);
    stair_gen.create(model);
    console.log("model of stair", model.ui.stair[1]) ;
    if (config.num_player == 1) {
       let player_config = null;
       let index  = randomInteger(1,3);
       let start_y_position = config.player_size + 1;
       let position_x = (model.ui.stair[index].position_x+(model.ui.stair[index].length * model.ui.stair[index].unit*0.5));
       let position_y = (model.ui.stair[index].position_y  - start_y_position );
       // console.log("model.ui.stair[index].length",model.ui.stair[index].unit_length);
       player_config = {
         x:position_x,
         y:position_y,
         dy:config.falling_speed,
         color: "red",
         size : config.player_size
        }
      let player_gen = new generate_player(config.num_player,player_config);
      player_gen.create(model);

    }else {
      //  futue expansion, genearte multiplayer
    }
    //  after we generatre stair, we genearte the player we have 1 player so far
    console.log(model);
    window["model"] = model;
  }

  myApp.load = function (){
    main_load_canvas();
    // controller will handle input and interrupt (such as p as pasue)
    myApp.controller.controller_load_variable();
    // future expansion, use character img intead of a ball
    main_load_character_img();
    // create initial stairs and character
    initialize_view();
    // looping main function to play

    main();
  }
  return myApp;
}))
