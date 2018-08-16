(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){

  myApp.process_ui = function (){
    console.log("myApp_ajax.file_name",myApp_ajax.file_name);
    console.log("build up writing page");
    // myApp_ajax.effect();
    var process_frame =
    `
    <div>
      <div class = "process_input_preview" >
        <div class = "process_image_preview">
            <div class = "process_preview_title">Preview</div>
            <div class = "process_preview_img_container"></div>
        </div>
        <div class = "process_scroll_bar"></div>
      </div>
      <div class = "process_back_next"></div>
      <div class = "process_effect_container"></div>
    </div>
    `;
    $(`#content_holder`).html(process_frame);
    $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="${myApp.target.result}" alt="your image" />`);

  }
  function process_bind_ui(){

  }
  return myApp;
}))
