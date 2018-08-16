(function(factory){
 window.myApp= factory({});
}
(function(myApp){
  var id = '';
  myApp.config = {
                  id : ""
  };
  var select_flag = false;
  myApp.file_to_php;
  myApp.effect = "contrast";
  myApp.target;
  function save_config (cfg){
    console.log("container id is "+cfg.id);
    id = "#" + cfg.id;
    myApp.config.id = "#" + cfg.id;
  }

  myApp.upload = function (){
    console.log("I will upload file");
    console.log($("#imgInp").prop("files"));
    var file_data = $("#imgInp").prop("files")[0];
    if (typeof file_data == "object") {
      // console.log("file to data");
      myApp.file_to_php = file_data;
      // console.log(myApp.file_to_php);
      myApp_ajax.send_data_to_php();
    }else {
      $(`.main_preview_img_container`).html('please select a file');
      console.log("please select a file");
    }
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
        select_flag = true;
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log("e is ",e);
            $('#main_preview_image_field').attr('src', e.target.result);
            myApp.target =  e.target;
        }

        reader.readAsDataURL(input.files[0]);
    }
}
  function bind_ui (){
    $("#imgInp").change(function(){
        $(`.main_preview_img_container`).html(`<img id="main_preview_image_field" src="#" alt="your image" />`);
        $(`.main_preview_img_container`).css('background-color',"transparent");
        select_flag = false;
        readURL(this);
        if (!select_flag) {
          $(`.main_preview_img_container`).html(``);
          $(`.main_preview_img_container`).css('background-color',"white");
        }
    });
  }


  myApp.build_main_page = function (){
    var frame = `
        <div class = "main_title">Image Process & Effects</div>
        <div id = "content_holder">
          <div class = "main_input_preview" >
            <div class = "main_input_container">
              <input class = "form-control" type='file' id="imgInp" />
            </div>
            <div class = "main_image_preview">
                <div class = "main_preview_title">Preview</div>
                <div class = "main_preview_img_container"></div>
            </div>
            <div class = "main_upload">
              <button class = "form-control" id="upload" onclick = "myApp.upload()">Upload</button>
            </div>
          </div>
        </div>
`;
    $(`#image_app`).html(frame);
  }
  myApp.load = function(cfg){
    console.log("load app");
    save_config (cfg);
    myApp_ajax.load();
    myApp.build_main_page();
    bind_ui();
  }
  return myApp;

}))
