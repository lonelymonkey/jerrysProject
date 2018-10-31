function render(){

}

render.prototype.draw = function (model,canvas,ctx){
  // console.log(ctx);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // console.log(model);
  for (const prop in model.ui) {
    for (var i = 0; i < model.ui[prop].length; i++) {
      model.ui[prop][i].draw()
    }
  }
}
