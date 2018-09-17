(function(factory){
 window.myApp= factory(window.myApp);
}
(function(myApp){
  var scollbar_movement = 100;
  var previous_effect_photo = [];
  myApp.process_ui = function (name){
    console.log("myApp_ajax.file_name",myApp_ajax.file_name);
    console.log("build up writing page");
    // myApp_ajax.effect();
    var process_frame =
    `
    <div>
      <div class = "process_back_next process_control">
        <div class = "back_next_container">
          <div class = "process_next_back_button process_back" onclick = "myApp.process_go_back()">Change Photo...</div>
          <div>
            <a id = "process_download_img" href="" download></download>
              <label for = "process_download_img" class = "download_label"><i class="fa fa-download"></i></label>
            </a>
            <div id = "previous_effect_container">

            </div>
          </div>


        </div>
      </div>
      <div class = "process_input_preview" >
        <div class = "process_image_preview">
            <div class = "process_preview_img_container">
            </div>
            <div class = "process_img_loading_layer">
              <img class = "process_img_loading_placeholder" src = '../asset/loading_small.gif'>
            </div>
        </div>
      </div>
    </div>
    `;
    $(`.main_photo_container`).html(process_frame);
    $('.prohibed_layer').hide();
    $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="../uploads/${name}" alt="your image" />`);
  }

  myApp.process_view_previous_effect = function (url){
    var frame = '';
    console.log("previous_effect_photo.length ",previous_effect_photo.length );
    if (previous_effect_photo.length > 5) {
      previous_effect_photo.shift();
      console.log("previous_effect_photo.length ",previous_effect_photo.length );

      previous_effect_photo.push(url);
    }else {
      previous_effect_photo.push(url);
    }
    for (var i = 0; i < previous_effect_photo.length; i++) {
      frame = frame + `<div class = "previous_effect_placeholder" data-toggle="modal" data-target="#myModal" onclick = "myApp.process_show_big_previous_effect('${previous_effect_photo[i]}')">
        <div class = "previous_effect_preview_placeholder"><img class = "prvious_effect_preview" src = "${previous_effect_photo[i]}"></div>
      </div>`
    }
    $('#previous_effect_container').html(frame);

  }
  myApp.process_show_big_previous_effect = function (url){
    var view = `
    <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body" >
                <div>
                    <div id="previous_effect_view">
                      <img class = "previous_preview_img_placeholder" src = "${url}">
                    </div>
                </div>
                <div>
                  <a id = "process_download_previous_img" href="${url}" download></download>
                    <label for = "process_download_previous_img" class = "download_label download_label_previous btn"><i class="fa fa-download"></i>Download</label>
                  </a>
                </div>
            </div>
          </div>

        </div>
      </div>`;
      $("#modal_field").html(view);
  }
  myApp.process_go_back = function (){
    console.log("going back to previous page");
    var r = confirm("Are you sure you want to go back to Previous page ?");
    if (r) {
      myApp.home_page();
      previous_effect_photo = [];
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
    $('.process_img_loading_layer').show();
    $('.prohibed_layer').show();
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
