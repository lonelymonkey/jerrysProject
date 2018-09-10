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
  myApp_ajax.original_location = "";
  myApp_ajax.file_name = "";
  myApp_ajax.effect = function(effect) {
      // var file_name = "test.jpg";
      buildString = JSON.stringify(myApp_ajax.file_name);
      console.log(buildString);
      $.ajax({
        method : 'POST',
        dataType : 'json',
        url : config.apiUrl,
        data : { function : effect, data : buildString },
        success : function(response) {
          console.log(response);
          // $(`.process_preview_img_container`).html('<img src="' + response.data+ '" />');
          $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="${myApp_ajax.original_location}" alt="your sdfsdfimage" />`);
        }
      });
    }
  myApp_ajax.all_effect = function(){
    buildString = JSON.stringify(myApp_ajax.file_name);
    $.ajax({
      method : 'POST',
      dataType : 'json',
      url : config.apiUrl,
      data : { function :  "preview_effect", data : buildString },
      success : function(response) {
        console.log(response);
        var effect_list = Object.keys(response.data);
        // myApp.process_preview_display(response.data,effect_list);
      }
    });
  }
  myApp_ajax.send_data_to_php = function (){
    // buildString = JSON.stringify(myApp.file_to_php);
    // console.log(myApp.file_to_php);
    var form_data = new FormData();
    form_data.append('file', myApp.file_to_php);
    $('.loading_layer').show();
    $.ajax({
        url: config.apiUrl, // point to server-side PHP script
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(php_script_response){
            console.log(php_script_response); // display response from the PHP script, if any
            myApp_ajax.file_name = php_script_response.file_name;
            setTimeout(function(){
              $('.loading_layer').hide();
              myApp.process_ui(php_script_response.file_name);
              console.log("go to all effect");
              myApp_ajax.all_effect();
            }, 1500);

            // myApp_ajax.effect();

        }
     });
  }
  myApp_ajax.test = function (){
    $.ajax({
        url: "../uploads/"+"223.jpeg", // point to server-side PHP script
        dataType: 'image/jpeg',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        type: 'get',
        success: function(php_script_response){
          console.log();

        }
     });
  }
  myApp_ajax.load = function(){
    console.log("ajax load");
    // testing effect and ajax
    // myApp_ajax.effect();
    }
  return myApp_ajax;
}))
