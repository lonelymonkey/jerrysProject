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
      piechart:{
        name :[],
        sample :[],
        color :[]
      }
    }

  ];
  // this function are going to print form
  var div_counting = model[0].data.counting;

  spinning_wheel.print_or_remove = function() {

        return print();

  }


  spinning_wheel.print_chart= function(object_inputs){
    console.log("I am in priint chart and inputs are following");
    console.log(object_inputs);
    model.piechart = object_inputs;
    console.log(model.piechart);
  }

function print(){
    var tracking_counting = 0;
    var output =
    '<div id = "div_'+div_counting+'" >'
    +'<form id = "input_'+div_counting+'"" action ="index.html">'
    +'<input type="text" name="name" class = "input_form" >'
    +'<input type="text" name="number_of_sample" class = "input_form" >'
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
