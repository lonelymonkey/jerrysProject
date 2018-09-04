(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  var scollbar_movement = 100;

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
      <div class = "process_back_next process_control">
        <div class = "back_next_container">
          <div class = "process_next_back_button process_back" onclick = "myApp.process_go_back()">Back</div>
        </div>
        <div class = "back_next_container">
          <div class = "process_next_back_button process_next">Next</div>
        </div>
      </div>
      <div class = "process_control">
        <div class = "process_move_css process_move_left">
          <div class = "procss_triangle_left triangle_css" onclick = "myApp.process_move('left')"></div>
        </div>
        <div class = "process_effect_container"></div>
        <div class = "process_move_css process_move_right">
          <div class = "procss_triangle_right triangle_css" onclick = "myApp.process_move('right')"></div>
        </div>

      </div>
    </div>
    `;
    $(`#content_holder`).html(process_frame);
    $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="${myApp.target.result}" alt="your image" />`);

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
