(function(factory){
 window.myApp_ajax = factory({});
}
(function(myApp_ajax){
  var config = {
    apiUrl : '../ajax/data.php',
  };

  myApp_ajax.previous_effect = "";
  myApp_ajax.original_location = "";
  myApp_ajax.file_name = "";
  myApp_ajax.effect = function(effect) {
      // var file_name = "test.jpg";
      buildString = JSON.stringify(myApp_ajax.file_name);

        $.ajax({
          method : 'POST',
          dataType : 'json',
          url : config.apiUrl,
          data : { function : effect, data : buildString },
          success : function(response) {
            myApp_ajax.previous_effect = effect;
            console.log(response);
            // $(`.process_preview_img_container`).html('<img src="' + response.data+ '" />');
            // $(`.process_preview_img_container`).html(`<img id="main_preview_image_field" src="${myApp_ajax.original_location}" alt="your sdfsdfimage" />`);
            $('.process_preview_img_container').html(`<img id = "main_preview_image_field" src = "../uploads/${response.data.id}.${response.data.type}">`);
            console.log("finish update");
            // myApp_ajax.file_name = `${response.data.id}.${response.data.type}`;
            $(`#process_download_img`).attr('href',response.data.url);
            myApp.process_view_previous_effect(response.data.url);
            $('.process_img_loading_layer').hide();
            $('.prohibed_layer').hide();
          }
        });

      console.log(effect);

    }
  myApp_ajax.all_effect = function(file_name,url){
    buildString = JSON.stringify(myApp_ajax.file_name);
    $.ajax({
      method : 'POST',
      dataType : 'json',
      url : config.apiUrl,
      data : { function :  "preview_effect", data : buildString },
      success : function(response) {

          console.log(response);
          var effect_list = Object.keys(response.data);
          myApp.effect_data.small_image = response.data;
          myApp.effect_data.feature_name = effect_list;
          $('.loading_layer').hide();
          myApp.process_ui(file_name);
          $(`#process_download_img`).attr('href',url);


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
    // COMBAK:
    // this is testing purpose;
    // myApp_ajax.file_name = 'test_purpose.jpeg';
    // myApp_ajax.all_effect(myApp_ajax.file_name);
    // COMBAK:

    // uncomment this after everything is done;
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
            if (php_script_response.status < 0) {
              console.log("file type is wrong");
              $('.loading_layer').hide();
              alert(php_script_response.errMsg);
            }else {
              myApp_ajax.file_name = php_script_response.file_name;


              console.log("go to all effect");
              myApp_ajax.all_effect(php_script_response.file_name,php_script_response.url);
            }


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
  myApp_ajax.upload_from_url = function (url){
    $('.loading_layer').show();

    // var test_url = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?cs=srgb&dl=beauty-bloom-blue-67636.jpg&fm=jpg"
    url_to_send = JSON.stringify(url);
     $.ajax({
       method : 'GET',
       dataType : 'json',
       url : config.apiUrl,
       data : { function : "get_img_online", data : url_to_send},
       success : function(response) {
         console.log(response);
         if (response.status < 0) {
           console.log("file type is wrong");
           $('.loading_layer').hide();
           alert(response.errMsg);
         }else {
           myApp_ajax.file_name = response.file_name;


           console.log("go to all effect");
           myApp_ajax.all_effect(response.file_name,response.url);
         }

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
