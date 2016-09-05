(function(factory){
  window.spinning_wheel = factory({});
}(function(spinning_wheel){
  var model = {

      data :{
        'counting' : 0,
        'total' : 0
      },
      id : [],
      decision:[]

  };
  // this function are going to print form
  var div_counting = model.data.counting;
  var piechart =  {
      id : [],
      name :[],
      sample :[],
      color :[]};
  spinning_wheel.print_or_remove = function(PRflag, id) {
    if (PRflag) {
      return print();
    }

    else {
      var id_position = piechart.id.indexOf(id);
      if (id_position > -1) {
        //console.log("test");
        piechart.id.splice(id_position, 1);
        piechart.name.splice(id_position, 1);
        piechart.sample.splice(id_position, 1);
        piechart.color.splice(id_position, 1);
        //console.log(JSON.stringify(piechart));
        create_piechart();
        }
    }
  }
  spinning_wheel.decide_output = function(){
    var probability_array = model.decision;
    var total = model.data.total;
    var target = 0;
    var total_prob = 0;
    var winner = '';
    for (var e = 0; e < piechart.sample.length; e++) {
      total += Number(piechart.sample[e]);
    }
    for (var e = 0; e < piechart.sample.length; e++) {
      probability_array.push(piechart.sample[e]/total);
    }
    var random = Math.random();
    //console.log("probability_array is " + JSON.stringify(probability_array));
    //console.log("random is " + random);
    for (var i = 0; i < probability_array.length; i++) {
      total_prob = total_prob + probability_array[i];
    //  console.log("total_prob is " + total_prob);

      if (random < total_prob) {
        target = i;
        break;
      }

    }
    winner = piechart.name[target];
    //console.log("target out of for loop is " + target);
    model.decision = [];
    return [winner, random];



  }



  spinning_wheel.print_chart= function(object_inputs, id){
  //  console.log(model[2].id);
    var result_multiple = check_multiple_submit(id);
    var mutiple_id = result_multiple[1]
    if (result_multiple[0] == true) {
      if (piechart.name[mutiple_id] == object_inputs.name && piechart.sample[mutiple_id] == object_inputs.number_of_sample && piechart.color[mutiple_id] == object_inputs.color) {

      }
      else {
        piechart.name[mutiple_id] = object_inputs.name;
        piechart.sample[mutiple_id] = object_inputs.number_of_sample;
        piechart.color[mutiple_id] = object_inputs.color;
        create_piechart();
      }
    }
    else {
      model.id.push(id);
      save_input_value(object_inputs, id);
      create_piechart();
    }

  }
function create_piechart(){
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  var lastend = 0;
  //var data = [200, 60, 15]; // If you add more data values make sure you add more colors
  var myTotal = 0; // Automatically calculated so don't touch
  //var myColor = ['red', 'green', 'blue']; // Colors of each slice
  //console.log(piechart.sample);
  //console.log(piechart.color);
  for (var e = 0; e < piechart.sample.length; e++) {
    myTotal += Number(piechart.sample[e]);
  }
  //console.log("total is " + myTotal + " and sample lenght is " + piechart.sample.length);
  for (var i = 0; i < piechart.sample.length; i++) {
    ctx.fillStyle = piechart.color[i];
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 * (piechart.sample[i] / myTotal)), false);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.fill();
    lastend += Math.PI * 2 * (piechart.sample[i] / myTotal);
}
if (piechart.sample.length == 0) {
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
  ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, lastend, lastend + (Math.PI * 2 ), false);
  ctx.lineTo(canvas.width / 2, canvas.height / 2);
  ctx.fill();
  lastend += Math.PI * 2 ;
}

}
function check_multiple_submit(id){
  var id_array = model.id;


      if (id_array.indexOf(id)> -1) {
        return [true, piechart.id.indexOf(id)];
      }else {
        return false;
      }

}
function save_input_value (object_inputs, id ){
  piechart.id.push(id);
  piechart.name.push(object_inputs.name);
  piechart.sample.push(object_inputs.number_of_sample);
  piechart.color.push(object_inputs.color);

}
function print(){
    var color = randomColor();
    var tracking_counting = 0;
    var output =
    '<div id = "div_'+div_counting+'" >'
    +'<form id = "input_'+div_counting+'"" action ="index.html">'
    +'<input type="text" id = "input_name_check'+div_counting+'" name="name" class = "input_form" >'
    +'<input type="text" id = "input_sample_check'+div_counting+'" name="number_of_sample" class = "input_form" >'
    +'<input type="color" name="color" class = "input_form" value = "'+color+'">'
    +'<button type = "button" id = "remove" class = "button" >&#x2717</button>'
    +'</form>'
    +'</div>';
    //console.log("form is " + output);
    div_counting ++;
    //console.log(div_counting);
    return output;
  }
  function randomColor(){
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
  }
  return spinning_wheel;
}))

/************************************
Test Cases:
  each array inside test simulates a sequence of user input
*****************************************/
