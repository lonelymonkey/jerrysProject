(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  var scollbar_movement = 100;

  myApp.process_ui = function (name){
    console.log("myApp_ajax.file_name",myApp_ajax.file_name);
    console.log("build up writing page");
    // myApp_ajax.effect();
    var process_frame =
    `
    <div>
      <div class = "process_back_next process_control">
        <div class = "back_next_container">
          <div class = "process_next_back_button process_back" onclick = "myApp.process_go_back()">Back</div>
        </div>
      </div>
      <div class = "process_input_preview" >
        <div class = "process_image_preview">
            <div class = "process_preview_img_container"></div>
        </div>
        <div class = "process_image_loading">
            <img src = "../asset/loading.gif">
        </div>
      </div>
    </div>
    `;
    $(`.main_photo_container`).html(process_frame);
    $('.prohibed_layer').hide();
    $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="../uploads/${name}" alt="your image" />`);
  }
  myApp.process_preview_display = function (response,list){
    console.log("effect list ",list);
    var preview_frame = ``;
    for (var i = 0; i < list.length; i++) {
      preview_frame = preview_frame + `<div class = "process_preview_icon"><img class = "process_preview_image" onclick = "myApp.proess_select_effect('${list[i]}')" src = ${response[list[i]]}></div>`;
    }
    $(".process_effect_container").html(preview_frame);
  }
  myApp.process_go_back = function (){
    console.log("going back to previous page");
    var r = confirm("Are you sure you want to go back to Previous page ?");
    if (r) {
      myApp.home_page();

    }else {

    }
  }
  myApp.process_move = function (direction){
    var position = $('.process_effect_container').scrollLeft();
    console.log("the direction is ", direction);
    // if (scollbar_movement == ) {
    //
    // }else if (true) {
    //
    // }

    if (direction == "right") {
      $('.process_effect_container').animate({scrollLeft: position + 100}, 200);
    }else if (direction == "left") {
      $('.process_effect_container').animate({scrollLeft: position - 100}, 200);


    }
          // clicking the "up" button will make the page scroll to the top of the page

  }
  myApp.proess_select_effect = function (effect_name){
    $('.process_image_loading').show();
    $('.process_scroll_bar').hide();
    switch (effect_name) {
      case "smooth":
        myApp.process_scroll_bar(effect_name);
        break;
      default:
      myApp_ajax.effect(effect_name);

    }

  }
  myApp.process_scroll_bar = function (effect_name){
    $('.process_scroll_bar').show();


    myApp_ajax.effect(effect_name);
  }
  return myApp;
}))
