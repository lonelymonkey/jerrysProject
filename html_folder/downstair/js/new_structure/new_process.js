(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  const processor = {
    update : function (model,canvas,ctx,config,game_management,stair_config){
      remove_stair(model);
      moving_stair(model);
      create_stair(model,config,canvas,ctx,stair_config);
      process_control(model,canvas,config);
      process_collision(model,canvas,config,game_management);
    }

  }
  let y_touch = true;
  let x_touch = true;
  let stair_index = 0;
  let falling = false;
  let original_falling_speed;
  function process_collision(model,canvas,config,game_management){
    // for (var i = 0; i < array.length; i++) {
    //   array[i]
    // }
    if (model.ui.player[0].y+model.ui.player[0].radius > canvas.height) {
      console.log(" canvas.height", canvas.height);
      console.log("model.ui.player[0].y+model.ui.player[0].radius", model.ui.player[0].y+model.ui.player[0].radius);

      game_management.game_over = true;
    }else {
      model.ui.player.forEach(( player, playerIdx ) => {
        for (var i = 0; i < model.ui.stair.length; i++) {
          // console.log(" model.ui.stair", model.ui.stair[i]);
          y_touch = check_y_axis(player,model.ui.stair[i],i,config.tolerance);
          if (y_touch) {
            x_touch = check_x_axis(player,i,model.ui.stair[i]);
            if (x_touch) {
              falling = false;
              break;
            }else {
              falling = true;
            }
          }else {
            falling = true;
            continue;
          }
        }
      });
      // console.log("falling ",falling);
      // TEMP: falling is false make is fallling
      // falling = false;
      if (falling) {
        model.ui.player[0].y += model.ui.player[0].dy;
        model.ui.player[0].dy *= .99;
        model.ui.player[0].dy += .075;
      }else {
        // myApp.character.y = myApp.character.y-myApp.dy;
        model.ui.player[0].dy = config.falling_speed;
        model.ui.player[0].y -= config.speed;
      }

    }

  }
  function check_y_axis (player,stair,stair_index,tolerance){
    // console.log("player.y + player.size",player.y + player.radius);
    // console.log("stair.position_y + tolerance",stair.position_y + tolerance);
    // // console.log("player.y + player.size",player.y + player.radius);
    // console.log("stair.position_y - tolerance",stair.position_y - tolerance);

    if (player.y + player.radius < stair.position_y + tolerance && player.y + player.radius > stair.position_y - tolerance) {
      return true;
    }else {
      return false;
    }
  }
  function check_x_axis (player,index,stair){
    // console.log("player x ",player.x);
    // console.log("stair x ",stair.position_x);
    // console.log("stair x ",stair.position_x +stair.length*stair.unit );


    if (player.x > stair.position_x && player.x < stair.position_x +stair.length*stair.unit) {
      return true;
    }else {
      return false;
    }
  }

  function process_control (model,canvas,config){
    // console.log("canvas",canvas);
    if (myApp.controller.rightPressed && model.ui.player[0].x < canvas.width-model.ui.player[0].radius) {
      model.ui.player[0].x += config.player_speed;
    }else if (myApp.controller.leftPressed && 0 < model.ui.player[0].x -model.ui.player[0].radius) {
      model.ui.player[0].x -= config.player_speed;
    }
  }
  function create_stair(model,config,canvas,ctx,stair_type_config){
    if (model.ui.stair.length < config.max_stair) {
      stair_config = null;
      int_generator = new randomInteger();
      let stair_type = int_generator.result(0,2);
      let stair_len = int_generator.result(3,5);
      let select_stair = stair_type_config[stair_type];

      if (stair_type != 2) {
        stair_len = select_stair.stair_length;
        console.log("stair_len = ", stair_len);
      }

      x = int_generator.result(0,canvas.width - config.stair_unit * stair_len);
      y = int_generator.result(980,1000);
      stair_config = {
                          x:x,
                          y:y,
                          length: stair_len,
                          color: select_stair.color,
                          height :select_stair.stair_height,
                          dy :  config.speed,
                          unit_length : config.stair_unit
                        };
      // console.log("stair_config",stair_config);
      let stair_gen = new generate_stair(1,stair_config);
      stair_gen.create(model);
    }
  }
  function remove_stair(model){
    // console.log("position of the first stair",model.ui.stair[0].position_y);
    if (model.ui.stair[0].position_y + model.ui.stair[0].height < 0) {
      model.ui.stair.shift();
    }
    // console.log("lenght of stair array ",  model.ui.stair.length);
  }
  function moving_stair (model,canvas,ctx){
    // console.log("model",model);
    for (var i = 0; i < model.ui.stair.length; i++) {
      model.ui.stair[i].position_y = model.ui.stair[i].position_y - model.ui.stair[i].dy;
    }

  }
  myApp.processor =processor;
  return myApp;
}))
