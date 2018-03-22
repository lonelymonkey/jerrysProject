(function(factory){
 window.myApp_ajax = factory({});
}
(function(myApp_ajax){
  var config = {
    apiUrl : '../ajax/data.php',
  };

  var static_data = {
    champions : [],
    spells : [],
    items : [],

  }
  function doSomething() {
    console.log('do something');
  };
    myApp_ajax.config = function(cfg) {
      $.extend(config,cfg);
    }
    myApp_ajax.save_build = function(buildString,callback) {
      console.log(JSON.parse(buildString));
      $.ajax({
        method : 'POST',
        dataType : 'json',
        url : config.apiUrl,
        data : { function : 'save_data', data : buildString },
        success : function(response) {
          if (typeof(callback) == 'function') {
            callback(response);
          }
        }
      });
    }
  myApp_ajax.log_in = function(){
    $.ajax({
      method : 'GET',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'log_in' },
      success : function(response) {
        myApp.user_validation(response);
      }
    })
  }
  function get_initial_data(){
    console.log("I am in get_initial_data");
    $.ajax({
      method : 'GET',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'get_initial_data' },
      // async: false,
      success : function(response) {
        // console.log('we got our initial data back');
        // console.log(response);
        myApp.read_initial_data(response);
        myApp.load_exist_build();
      }
    })
  }
  myApp_ajax.get_build_details = function(build_id){
    console.log("calling ajax here to load data from db, build id is " + build_id);
    var js_to_php = JSON.stringify({build_id : build_id});
    $.ajax({
      method : 'GET',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'get_build_sets',data : js_to_php},
      // async: false,
      success : function(response) {
        // console.log('we got our initial data back');
        // console.log(response);
        myApp.read_initial_data(response);
      }
    })

  }
  myApp_ajax.load = function(){
     get_initial_data();
    }
  return myApp_ajax;
}))


// (function(factory){
//  window.myApp = factory({});
// }
// (function(myApp){
//
//   return myApp;
// }))
