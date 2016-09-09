(function(factory){
  window.spinning_wheel = factory({});
}(function(spinning_wheel){

  var model = {

      data :{
        'counting' : 0,
        'total' : 0,
        'angle' : 270,
        'velocity' : 0,
        'print_remove' : false
      },
      json : true,
      validation: false,
      id : [],
      decision:[],
      probability:[]
  };
  var piechart =  {
      id : [],
      name :[],
      sample :[],
      color :[]};
// Print or remove form, depend on the flag pass into the function
function print_or_remove(PRflag, id) {
    if (PRflag) {

      return print();
    }

    else {
      var id_position = piechart.id.indexOf(id);
      if (id_position > -1) {
        //console.log("test");
        console.log('remove');
        piechart.id.splice(id_position, 1);
        piechart.name.splice(id_position, 1);
        piechart.sample.splice(id_position, 1);
        piechart.color.splice(id_position, 1);
        //console.log(JSON.stringify(piechart));
        model.json = JSON.stringify(piechart);
        window.location.hash = model.json;
        create_piechart();
        }
    }
  }
// THis function decide the winner, and then pass to the rotation
function decide_output(){
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
// This function does the update the piechart and create piechart. If nothing change, does nothing
function print_chart(object_inputs, id){
  //  console.log(model[2].id);
    //console.log("in begining of print_piechart, id is  "+JSON.stringify(piechart.id));
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
// This function create piechart
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
    ctx.moveTo((canvas.width) / 2, (canvas.height) / 2);
    // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
    ctx.arc((canvas.width) / 2, (canvas.height) / 2, (canvas.height+10) / 2, lastend, lastend + (Math.PI * 2 ), false);
    ctx.lineTo((canvas.width) / 2, (canvas.height)/ 2);
    ctx.fill();
    lastend += Math.PI * 2 ;
  }

}
// This function will check the the input's graph is created or not
function check_multiple_submit(id){
  var id_array = model.id;

      if (id_array.indexOf(id)> -1) {
        return [true, piechart.id.indexOf(id)];
      }else {
        return false;
      }

}
// store input to piechart
function save_input_value (object_inputs, id ){
  // when we do the hash tag, we will save duplicated id, so we set this if condition to avoid it
  if (piechart.id.indexOf(id) == -1) {
    piechart.id.push(id);
  }


  piechart.name.push(object_inputs.name);
  piechart.sample.push(object_inputs.number_of_sample);
  piechart.color.push(object_inputs.color);

}
// print form(name, sample, and color)
function print(){
    var color = randomColor();
    var tracking_counting = 0;
    var output =
    '<div id = "div_'+model.data.counting+'" >'
    +'<form id = "input_'+model.data.counting+'"" action ="index.html">'
    +'<input type="text" id = "input_name_check'+model.data.counting+'" name="name" class = "input_form" >'
    +'<input type="text" id = "input_sample_check'+model.data.counting+'" name="number_of_sample" class = "input_form"  >'
    +'<input type="color" id = "input_color_check'+model.data.counting+'" name="color" class = "input_form" value = "'+color+'">'
    +'<button type = "button" id = "remove" class = "button" >&#x2717</button>'
    +'</form>'
    +'</div>';
    //console.log("form is " + output);
    model.data.counting ++;
    //console.log(div_counting);
    return output;
  }
// create random color
function randomColor(){
    var color = Math.floor(Math.random() * 16777216).toString(16);
    return '#000000'.slice(0, -color.length) + color;
  }
// check the input every 0.05s, and validate the input
function live_update_print (id){
    var values = {};
    $.each($('#input_'+id).serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    //console.log(values);
  /************************* Validation of input**********************************************************/
    if (values.name != "") {
      $("#input_name_check"+id).css("box-shadow","1px 1px 15px green");
      $("#input_name_check"+id).css("border-style","solid");
      $("#input_name_check"+id).css("border-color","green");
      if (values.number_of_sample != "" && values.number_of_sample.match(/^[0-9]+$/) != null) {

        print_chart(values, id);
        // if we can print pie chart, which means data is valid. Therefore, we can store those data in our #
        model.json = JSON.stringify(piechart);
        window.location.hash = model.json;
        /*after we print pie chart, we enable our start button*/
        $("button[id = 'start']").prop('disabled', false);
        $("#input_name_check"+id).css("border-style","solid");
        $("#input_sample_check"+id).css("border-style","solid");
        $("#input_sample_check"+id).css("border-color","green");
        $("#input_name_check"+id).css("border-color","green");
        $("#input_sample_check"+id).css("box-shadow","1px 1px 15px green");
        $("#input_name_check"+id).css("box-shadow","1px 1px 15px green");
      }
      else {
        $("#input_sample_check"+id).css("box-shadow","1px 1px 15px red");
        $("#input_sample_check"+id).css("border-color","red");
      }
    }else if (values.number_of_sample == "") {
      $("#input_sample_check"+id).css("box-shadow","1px 1px 10px red");
      $("#input_name_check"+id).css("box-shadow","1px 1px 10px red");
      $("#input_sample_check"+id).css("border-color","red");
      $("#input_name_check"+id).css("border-color","red");
    }
    else {
      $("#input_sample_check"+id).css("box-shadow","1px 1px 15px green");
      $("#input_sample_check"+id).css("border-color","green");
      $("#input_sample_check"+id).css("border-style","solid");
      $("#input_name_check"+id).css("box-shadow","1px 1px 15px red");
    }

  }
// bind all the events
function bindbasicUI(){
    /*we don't want to spin with nothing, so we disable start button if no pie chart printed*/
    // if json is not empty, which user can start to rotate , so we don't want to disabled #start button when we have data in#
    if (model.json == "") {
      $("#start").attr("disabled","disabled");

    }
    $('#add').click(function(){
      model.data.print_remove = true;
    $("#Form_print").append(print_or_remove(model.data.print_remove, null));

    });

    $("#Form_print").on("click",'#remove', function(){
        //console.log("test");

        model.data.print_remove = false
        var removeid = $(this).parent().attr('id');
        //console.log("parent id is  " + removeid);
        var numbercheck = /\d+/g;
        var typecheck = /\D+/g;
        var div_id = removeid.match(numbercheck);
        $("#div_"+div_id[0]).remove();
        print_or_remove(model.data.print_remove,div_id[0]);
    });
    $("#Form_print").on("focus",'input', function(){
        var id = $(this).parent().attr('id');
        var numbercheck = /\d+/g;
        var div_id = id.match(numbercheck);

        model.validation = setInterval(function(){

          live_update_print(div_id[0]);

        }, 50);
    });
    $("#Form_print").on("focusout",'input', function(){

      clearInterval(model.validation);

    });
  }
// if we have pre-set inputs, those inputs will be in the url, we obtain it and then draw the piechart and create input form
function check_hash(){
  // if # is nothing, we need to stop this function
  model.json= window.location.hash.substr(1);
  if (model.json == "") {

  }
  // if hash is not emtpy, we take value and then store to our piechart object, and then print the piechart and form
  else {
    model.json= window.location.hash.substr(1);
    var json = JSON.parse(model.json);
    piechart.id= json["id"];
    piechart.name= json["name"];
    piechart.sample= json["sample"];
    piechart.color = json["color"];
    // we do have to array to track id, so model.id is the one to check multiple id, we need to synchornize it as well
    model.id = piechart.id;

    //we print the form, and print the previous values into those check box
    for (var i = 0; i < piechart.id.length; i++) {
      model.data.counting = piechart.id[i];
      console.log(model.data.counting);
      $("#Form_print").append(print_or_remove(true, model.data.counting));
      $("#input_name_check"+ piechart.id[i]).val(piechart.name[i]);
      $("#input_sample_check"+ piechart.id[i]).val(piechart.sample[i]);
      $("#input_color_check"+ piechart.id[i]).val(piechart.color[i]);

    }
    model.data.counting++;
    create_piechart();
    //console.log(div_counting);
    //console.log(JSON.stringify(piechart));

  }
  }
// rotate the piechart
function rotation(){

    $.getScript("JQuery/jQueryRotate.js", function(){
      $('#can').rotate(model.data.angle);
      $('#start').click(function(){
      var output = decide_output();
      var winner = output[0];
      var winner_probability = output[1];
      console.log("winner is " + winner);
      console.log("should stop at " +winner_probability*360+" degree");
      /*************************/
      var rotation = setInterval(function(){
        var stop = 360*49+270-8.455;
        model.data.velocity = -(1.167983132986*0.000001)*(model.data.angle*model.data.angle)+(0.0207325)*(model.data.angle)+5;
        //angle1 = angle1 + 15*0.001*angle1 +10;
        model.data.angle = model.data.angle + model.data.velocity;
        $('#can').rotate(model.data.angle);

        if (model.data.velocity!=0) {
          $('button').prop('disabled', true);
          $('input').prop('disabled',true);
        }
        if (model.data.angle > stop - 360 * winner_probability) {
          console.log(model.data.angle);
          console.log("done");
          clearInterval(rotation);
          model.data.angle =0;
          model.data.velocity =0;
          $('button').prop('disabled', false);
          $('input').prop('disabled',false);

           }
        },50);
      });
    });
  }
spinning_wheel.load = function(){
    bindbasicUI();
    check_hash();
    rotation();
  }
return spinning_wheel;
}))
