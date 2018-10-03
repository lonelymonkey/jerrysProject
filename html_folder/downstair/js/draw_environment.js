(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  // var canvas = document.getElementById("myCanvas");


  function load_variables (){
    myApp.canvas = $('#myCanvas')[0];
    // console.log(canvas);
    myApp.ctx = myApp.canvas.getContext('2d');

  }
  myApp.load = function (){
    load_variables();

  }

  return myApp;
}))
