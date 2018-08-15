(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  var id = '';
  myApp.config = {
                  id : ""
  };
  myApp.file_to_php;
  myApp.effect = "scale_gray";
  function save_config (cfg){
    console.log("container id is "+cfg.id);
    id = "#" + cfg.id;
    myApp.config.id = "#" + cfg.id;
  }

  myApp.upload = function (){
    console.log("I will upload file");
    var file_data = $("#image_field").prop("files")[0];
    if (typeof file_data == "object") {
      // console.log("file to data");
      myApp.file_to_php = file_data;
      // console.log(myApp.file_to_php);
      myApp_ajax.send_data_to_php();
    }else {
      console.log("please select a file  ");
    }
  }
  myApp.load = function(cfg){
    console.log("load app");
    save_config (cfg);
    myApp_ajax.load();
  }
  return myApp;

}))
