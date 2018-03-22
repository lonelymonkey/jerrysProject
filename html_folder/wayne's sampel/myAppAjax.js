(function(factory){
 window.myAppAjax = factory({});
}
(function(myAppAjax){
  var config = {
    apiUrl : '../ajax/data.php',
  };
  function doSomething() {
    console.log('do something');
  };
  myAppAjax.config = function(cfg) {
    $.extend(config,cfg);
  }
  myAppAjax.saveBuild = function(buildString,callback) {
    $.ajax({
      method : 'POST',
      dataType : 'json',
      url : config.apiUrl,
      data : { function : 'saveBuild', data : buildString },
      success : function(response) {
        if (typeof(callback) == 'function') {
          callback(response);
        }
      }
    });
  }
  return myAppAjax;
}))



// myApp.load({      
//   containerId : 'app_1',
//   apiUrl : '../ajax/data.php'
//  });
