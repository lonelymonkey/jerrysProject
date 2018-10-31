/*********************************************
This file is handling the stair generator., basically it create a object of the stair, and then push them into model
and stair draw function

**********************************************/

function generate_stair(num_stair,option){
  this.option = option;
  this.num_stair = num_stair;
}
generate_stair.prototype.create = function (model){
  if(this.num_stair > 1){
    for (var i = 0; i < this.num_stair; i++) {
      let stair = new stair_object(this.option[i]);

      model.ui.stair.push(stair);
    }
  }else {
    let stair = new stair_object(this.option);

    model.ui.stair.push(stair);
  }

}

function stair_object(option){
  // console.log("option",option);
  this.position_x = option.x;
  this.position_y = option.y;
  this.length = option.length;
  this.color = option.color;
  this.height = option.height
  this.unit = option.unit_length;
  this.dy = option.dy;
}

stair_object.prototype.draw = function (){
  myApp.ctx.save();
  myApp.ctx.beginPath();
  myApp.ctx.rect(this.position_x,this.position_y, this.unit*this.length, this.height);
  myApp.ctx.fillStyle = this.color;
  myApp.ctx.fill();
  myApp.ctx.closePath();
  myApp.ctx.restore();
}
function generate_player(num_player,config){
  this.option = config;
  this.num_player = num_player;
}
//
generate_player.prototype.create = function (model){
  console.log("create player model");

  if(this.num_player == 1){
    let player = new player_object(this.option);
    console.log("player", player);
    model.ui.player.push(player);
  }else {
    // futre expansion
  }

}
//
function player_object(option){
  this.color = option.color;
  this.x = option.x;
  this.y = option.y;
  this.dy = option.dy;
  this.radius = option.size;
  console.log("the option is ", option);
  console.log("store player config into model");
}
player_object.prototype.draw = function (){
  myApp.ctx.save();
  myApp.ctx.beginPath();
  myApp.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
  myApp.ctx.closePath();
  myApp.ctx.fillStyle = this.color;
  myApp.ctx.fill();
  myApp.ctx.restore();

}
