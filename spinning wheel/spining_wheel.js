(function(factory){
  window.spinning_wheel = factory({});
}(function(spinning_wheel){
  var model = [
    {
      data :{
        'counting' : 0
      }
    },
    {
      char : ['+','X'],
      data : {
        'type' : 'add_remove'
      }
    },
    {
      id : []
      }


  ];
  // this function are going to print form
  var div_counting = model[0].data.counting;
  var piechart =  {
      id : [],
      name :[],
      sample :[],
      color :[]};
  spinning_wheel.print_or_remove = function() {

        return print();

  }


  spinning_wheel.print_chart= function(object_inputs, id){
  //  console.log(model[2].id);
    if (check_multiple_submit(id) == true) {
      alert("This sample is submitted already");
    }
    else {
      model[2].id.push(id);
      save_input_value(object_inputs, id);
    }
    create_piechart();
  }
function create_piechart(){
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  var lastend = 0;
  //var data = [200, 60, 15]; // If you add more data values make sure you add more colors
  var myTotal = 0; // Automatically calculated so don't touch
  //var myColor = ['red', 'green', 'blue']; // Colors of each slice
  console.log(piechart.sample);
  console.log(piechart.color);
  for (var e = 0; e < piechart.sample.length; e++) {
    Number()
    myTotal += Number(piechart.sample[e]);
  }
  console.log("total is " + myTotal + " and sample lenght is " + piechart.sample.length);
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

}
function check_multiple_submit(id){
  var id_array = model[2].id;
  console.log(JSON.stringify(id_array));
  console.log("id is " + id );
  console.log("array of id is " + id_array +" and id_array.indexOf is " + id_array.indexOf(id));
  /********************************* mutilple submit needs more condition, for example,
  we need to check user changes its inputs name , color, or # of sample,

  we need to replace it if they do do changes those inputs*

  */
      if (id_array.indexOf(id)> -1) {
        return true;
      }else {
        return false;
      }

    return false;


}
function save_input_value (object_inputs, id ){
  piechart.id.push(id);
  piechart.name.push(object_inputs.name);
  piechart.sample.push(object_inputs.number_of_sample);
  piechart.color.push(object_inputs.color);
  console.log("in piechart, id is " + piechart.id)
  console.log("in piechart, name is " + piechart.name);
  console.log("in piechart, sampe is " + piechart.sample);
  console.log("in piechart, color is " + piechart.color);
}
function print(){
    var tracking_counting = 0;
    var output =
    '<div id = "div_'+div_counting+'" >'
    +'<form id = "input_'+div_counting+'"" action ="index.html">'
    +'<input type="text" id = "input_name_check'+div_counting+'" name="name" class = "input_form" >'
    +'<input type="text" id = "input_sample_check'+div_counting+'" name="number_of_sample" class = "input_form" >'
    +'<input type="color" name="color" class = "input_form" >'
    +'<button type = "button" id = "remove" class = "button">&#x2717</button>'
    +'<button class = "button" type = "button" id = "submit_myform" value = "Submit">&#x2713</button>'
    +'</form>'
    +'</div>';
    //console.log("form is " + output);
    div_counting ++;

    return output;
  }

  return spinning_wheel;
}))

/************************************
Test Cases:
  each array inside test simulates a sequence of user input
*****************************************/
