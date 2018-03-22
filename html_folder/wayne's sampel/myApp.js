(function(factory){
 window.myApp = factory({});
}
(function(myApp){
  var id = '';
  var config = {
    containerId : 'myapp_container',
    apiUrl : '../ajax/data.php',
  };
  const data = {
    build : {
      "build_id": "0",
      "user_id": "1",
      "spell_set" : {
        "spell_id_1": "4",
        "spell_id_2": "11",
      },
    }
  };
  myApp.saveBuild = function() {
    var buildString = JSON.stringify(data.build);
    myAppAjax.saveBuild(buildString,function(res){
      //handle error
      if (res.status <= 0){
        console.log('handle error');
      } else {
        console.log('do something after saving build');
      }
    });
  }
  function saveConfig(cfg) {
    config = $.extend(config,cfg);
    id = '#'+config.containerId;
  }
  myApp.goTo = function (page) {
    $(id+' .content').html(page);
  }
  function buildUIFrame() {
    var view = `
      <div class="header">
        <button onclick="myApp.goTo('home')">home</button>
        <button onclick="myApp.goTo('view all build')">view all build</button>
        <button onclick="myApp.saveBuild()">Save dummy build</button>
      </div>
      <div class="content">content</div>
    `;
    $(id).html(view);
  }

  myApp.load = function(cfg){
    saveConfig(cfg);
    myAppAjax.config({
      apiUrl : cfg.apiUrl
    });
    console.log('building frame');
    buildUIFrame(); //build frame
    $(id+' .content').html('new view');
    callbackTester (tryMe, "hello", "goodbye");
    // get_Champion();
    // get_items();
    // get_spells();
    // bindUI();
  }
  return myApp;
}))
