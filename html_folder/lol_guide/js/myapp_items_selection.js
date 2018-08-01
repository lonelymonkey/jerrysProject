(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var item_set_structure = {
                              item_set_id : 0,
                              set_name : "",
                              note_id : 0,
                              remove : false
                          };
  var item_detail_structure = {
                                  detail_id : 0,
                                  item_set_id : 0,
                                  items : []
                              };
  var second_item_from = "";
  var local_item_set = [];
  var local_item_tags = [];
  var item_which_set =0;
  var largest_count = 0;
  var local_set_number = 0;
  var removed_set_id_array = [];
  var local_count_array = [];
  item_note_string_count = 0;
  var bind_set_name_ui = function(set_number){
    true_index = local_count_array.indexOf(set_number);
    $( "#item_set_name-"+set_number).keyup(function() {
      console.log("we are set # "+ set_number);

      console.log($("#item_set_name-"+set_number).val());
      myApp.save_build.item_set[true_index].set_name = $("#item_set_name-"+set_number).val();
      $('.item_set_button_'+set_number).html($("#item_set_name-"+set_number).val());
      console.log(myApp.save_build.item_set);
    });
  }



  myApp.item_check_tab = function (){
    // console.log("local_set_number",local_set_number);
    if (local_count_array.length > 0) {
      myApp.item_detail_frame(local_count_array[0]);
    }
  }
  myApp.item_reset = function (){
    largest_count = 0;
    removed_set_id_array = [];
    local_set_number = 0;
    item_which_set = 0;
    myApp.create_flag = false;
  }
  myApp.item_add_set = function () {
    local_count_array.push(local_set_number);

    $('.item_sets_tap').append(`<button onclick = "myApp.item_detail_frame(${local_set_number})" class = "btn btn-md item_set_button_${local_set_number} item_tab_css">Item set #${local_set_number}</button>`);

    myApp.save_build.item_set.push({
                                item_set_id : 0,
                                set_name : "",
                                note : "",
                                remove : false,
                                set_location : local_set_number
                            });
    myApp.save_build.item_detail_set.push({
                                    detail_id : 0,
                                    item_set_id : 0,
                                    items : []
                                });
    // console.log(myApp.save_build);

    console.log("local_count_array",local_count_array);
    console.log("local_set_number", local_set_number);
    myApp.item_detail_frame(local_set_number);
    local_set_number ++;


  }
  myApp.item_detail_frame = function (set_number){
    console.log();
    var backend_array_position = local_count_array.indexOf(set_number);
    console.log("test test test test tst");
    $(".item_choice").html("");
    $(".btn.btn-md").removeClass("item_active_button");
    $(`.item_set_button_${set_number}`).addClass("item_active_button");
    var item_choice_frame = `
                        <div class = "item_set_name">
                            <div class = "item_title_holder">item set Name: </div> <input class = "item_set_name_css form-control" id = "item_set_name-${set_number}" type = "text" placeholder = "Enter set name...">
                            <button class = "item_remove_button_css" onclick = "myApp.item_remove_set(${set_number})" >&#10008;</button>
                        </div>
                        <div class = "item_chosen">
                          <div class = "item_empty_icon_field"></div>
                        </div>
                        <div class = "item_notes-${set_number}">
                            <div class = "item_notes_title">
                                Notes
                            </div>
                            <div class = "item_notes_writing_area">
                                <textarea class ="form-control item_input_note" rows="8" cols="52" id ="item_notes-${set_number}"></textarea>
                            </div>
                            <div class = "item_note_count-${set_number} note_count_css">Max : 600</div>
                        </div>`;
    $(".item_pool_and_choice").show();
    $(".item_choice").html(item_choice_frame);
    item_which_set = set_number;
    console.log("backend_array_position",backend_array_position);
    $(`.item_notes-${set_number} textarea`).val(myApp.save_build.item_set[backend_array_position].note);

    $(".item_input_note").keyup(function(){
      console.log( $(this).parent().parent().attr("class"));
      var parent_class = $(this).parent().parent().attr("class");
      var index = parent_class.slice(-1);
      var index2 = parent_class.slice(-2);
      var true_index;
      console.log(typeof Number(index2));
      if (Number(index2) <= 0) {
        true_index = index;
      }else {
        true_index = index2;
      }
      console.log("true_index is",true_index);
      for (var i = 0; i < myApp.save_build.item_set.length; i++) {
        if (true_index == myApp.save_build.item_set[i].set_location) {
          console.log("set location is ", myApp.save_build.item_set[i].set_location);
          console.log("index is ", true_index);
          myApp.save_build.item_set[i].note = $(this).val();
          item_note_string_count = $(this).val().length;
          console.log("item_note_string_count",item_note_string_count);
          console.log("myApp.save_build.item_set[i].set_location",myApp.save_build.item_set[i].set_location);
          // $(`.item_note_count-${myApp.save_build.item_set[i].set_location}`).html(`${item_note_string_count}/600`);
          break;
        }
      }
      console.log(myApp.save_build.item_set);
    });
    console.log("NEW LOCATION",set_number);
    bind_set_name_ui(set_number);
    item_add_emtpy_icon();
    // console.log("I am in item set # " + set_number);
    // console.log(myApp.save_build.item_set[0]);
    // console.log("the item set name is " + myApp.save_build.item_set[set_number].set_name);
    $("#item_set_name-"+set_number).val(myApp.save_build.item_set[backend_array_position].set_name);
    for (var i = 0; i < myApp.save_build.item_detail_set[backend_array_position].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[backend_array_position].items[i]+`.png">`);
    }
  }
  myApp.item_remove_set = function (set_lcation){
    var true_location = 0;
    var diff = 0;
    true_location = local_count_array.indexOf(set_lcation);
    diff = local_count_array.length - true_location;
    console.log("local_count_array.length",local_count_array.length);
    console.log("true_location",true_location);
    console.log("before looking for true location",myApp.save_build.item_set);
    // console.log("target set removed = ",set_lcation);
    myApp.save_build.item_detail_set.splice(true_location,1);
    local_count_array.splice(true_location,1);

    console.log(myApp.save_build.item_detail_set);
    if (myApp.save_build.build_id != 0) {
      myApp.save_build.item_set[true_location].remove = true;
      myApp_ajax.save_build(JSON.stringify(myApp.save_build));
    }else {

      myApp.save_build.item_set.splice(true_location,1);
    }
    removed_set_id_array.push(set_lcation);
    $(".item_set_button_"+set_lcation).remove();
    console.log("item_set",myApp.save_build.item_set);
    console.log("item_detail_set",myApp.save_build.item_detail_set);
    // if (set_lcation > largest_count) {
    //   myApp.item_detail_frame(local_set_number-1);
    //
    // }else {
    //   myApp.item_detail_frame(local_set_number+1);
    //
    // }\
    if (local_count_array.length == 0) {
      $(".item_choice").html("")
      $(".item_pool_and_choice").hide();
    } else if (true_location == 0) {
      myApp.item_detail_frame(local_count_array[0]);
    }
    else {
      myApp.item_detail_frame(local_count_array[true_location-1]);

    }




    // myApp.save_build.against_champion.splice(set_lcation,1);


  }
  function item_add_emtpy_icon () {
    for (var i = 0; i < 28; i++) {
      $(".item_empty_icon_field").append(`<div class = "item_empty_container" id = "item_empty_container-${i}"><img class = "item_empty_icon" id = "item_empty_icon-${i}" src = "../assets/other/item_empty.png"></div>`);
    }
  }
  myApp.item_pool_to_selection = function (item_id){
    console.log("the select item id is " + item_id);
    console.log("myApp.save_build.item_detail_set",JSON.stringify(myApp.save_build.item_detail_set));
    console.log("item_which_set",item_which_set);
    var backend_array_position = local_count_array.indexOf(item_which_set);
    if (myApp.save_build.item_detail_set[backend_array_position].items.length<28) {
      myApp.save_build.item_detail_set[backend_array_position].items.push(item_id);
    }
    console.log(myApp.save_build.item_detail_set);
    for (var i = 0; i < myApp.save_build.item_detail_set[backend_array_position].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[backend_array_position].items[i]+`.png">`);
    }
  }
  myApp.item_remove_from_detail= function (item_be_removed){
    var backend_array_position = local_count_array.indexOf(item_which_set);

    console.log(myApp.save_build.item_detail_set[backend_array_position].items);
    myApp.save_build.item_detail_set[backend_array_position].items.splice(item_be_removed,1);
    console.log(myApp.save_build.item_detail_set[backend_array_position].items);
    for (var i = 0; i < myApp.save_build.item_detail_set[backend_array_position].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[backend_array_position].items[i]+`.png">`);
    }
    $("#item_empty_container-"+myApp.save_build.item_detail_set[backend_array_position].items.length).html(`<img  class = "item_empty_icon" src = "../assets/other/item_empty.png">`);
  }
  myApp.check_exist_set = function(){
    console.log("check exist set");
    var item_set_name;
    for (var i = 0; i < myApp.save_build.item_detail_set.length; i++) {
      if (myApp.save_build.item_set[i].set_name == "") {
        item_set_name = `Item set # ${i}`;
      }else {
        item_set_name = myApp.save_build.item_set[i].set_name;
      }
      console.log(i);
        $('.item_sets_tap').append(`<button onclick = "myApp.item_detail_frame(${local_count_array[i]})" class = "btn btn-md item_set_button_${local_count_array[i]} item_tab_css">${item_set_name}</button>`);
        myApp.save_build.item_set[i].set_location = local_count_array[i];
    }
  };
  return myApp;
}))
