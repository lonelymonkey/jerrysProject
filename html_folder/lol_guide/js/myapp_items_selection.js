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
  item_note_string_count = 0;
  var bind_set_name_ui = function(set_number){
    $( "#item_set_name-"+set_number).keyup(function() {
      console.log("we are set # "+ set_number);

      console.log($("#item_set_name-"+set_number).val());
      myApp.save_build.item_set[set_number].set_name = $("#item_set_name-"+set_number).val();
      console.log(myApp.save_build.item_set);
    });
  }




  myApp.item_reset = function (){
    largest_count = 0;
    removed_set_id_array = [];
    local_set_number = 0;
    item_which_set = 0;
    myApp.create_flag = false;
  }
  myApp.item_add_set = function () {
    console.log();
    if (removed_set_id_array.length != 0) {
      console.log(removed_set_id_array);
      removed_set_id_array.sort(function(a,b){return a-b});
      local_set_number = removed_set_id_array[0];
      removed_set_id_array.splice(0,1);
      console.log(removed_set_id_array);
    }else {
      largest_count = local_set_number;
    }
    $('.item_sets_tap').prepend(`<button onclick = "myApp.item_detail_frame(${local_set_number})" class = "btn btn-md item_set_button_${local_set_number}">Item set #</button>`);
    // console.log("item add set");
    // console.log(JSON.stringify(myApp.save_build));
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
    local_set_number ++;

  }
  myApp.item_detail_frame = function (set_number){
    console.log("test test test test tst");
    $(".item_choice").html("");
    $(".btn.btn-md").removeClass("item_active_button");
    $(`.item_set_button_${set_number}`).addClass("item_active_button");
    var new_location = 0;
    var item_choice_frame = `
                        <div class = "item_set_name">
                            <span>item set Name: </span> <input id = "item_set_name-${set_number}" type = "text" placeholder = "Enter set name...">
                            <button onclick = "myApp.item_remove_set(${set_number})" >&#10008;</button>
                        </div>
                        <div class = "item_chosen">
                          <div class = "item_empty_icon_field"></div>
                        </div>

                        <div class = "item_notes-${set_number}">
                            <div class = "item_notes_title">
                                Notes
                            </div>
                            <div class = "item_notes_writing_area">
                                <textarea class ="item_input_note" rows="8" cols="52" id ="item_notes-${set_number}"></textarea>
                            </div>
                            <div class = "item_note_count-${set_number} note_count_css">Max : 600</div>
                        </div>`;
    $(".item_pool_and_choice").show();
    $(".item_choice").html(item_choice_frame);
    item_which_set = set_number;
    for (var i = 0; i < myApp.save_build.item_set.length; i++) {
      if (set_number == myApp.save_build.item_set[i].set_location) {
        new_location = i;
        $(`.item_notes-${i} textarea`).val(myApp.save_build.item_set[i].note);
        break;
      }
    }
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
    bind_set_name_ui(new_location);
    item_add_emtpy_icon();
    console.log("I am in item set # " + new_location);
    console.log(myApp.save_build.item_set[0]);
    console.log("the item set name is " + myApp.save_build.item_set[new_location].set_name);
    $("#item_set_name-"+set_number).val(myApp.save_build.item_set[new_location].set_name);
    for (var i = 0; i < myApp.save_build.item_detail_set[new_location].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[new_location].items[i]+`.png">`);
    }
  }
  myApp.item_remove_set = function (set_lcation){
    var true_location = 0;
    console.log("before looking for true location",myApp.save_build.item_set);
    for (var i = 0; i < myApp.save_build.item_set.length; i++) {
      console.log(myApp.save_build.item_set[i]);
      if (myApp.save_build.item_set[i].set_location == set_lcation) {
        true_location = i;
        break;
      }
    }
    // console.log("target set removed = ",set_lcation);
    myApp.save_build.item_detail_set.splice(true_location,1);
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

      $(".item_choice").html("")
      $(".item_pool_and_choice").hide();



    // myApp.save_build.against_champion.splice(set_lcation,1);


  }
  function item_add_emtpy_icon () {
    for (var i = 0; i < 24; i++) {
      $(".item_empty_icon_field").append(`<div class = "item_empty_container" id = "item_empty_container-${i}"><img class = "item_empty_icon" id = "item_empty_icon-${i}" src = "../assets/other/item_empty.png"></div>`);
    }
  }
  myApp.item_pool_to_selection = function (item_id){
    console.log("the select item id is " + item_id);
    console.log("myApp.save_build.item_detail_set",JSON.stringify(myApp.save_build.item_detail_set));
    console.log("item_which_set",item_which_set);
    if (myApp.save_build.item_detail_set[item_which_set].items.length<24) {
      myApp.save_build.item_detail_set[item_which_set].items.push(item_id);
    }
    console.log(myApp.save_build.item_detail_set);
    for (var i = 0; i < myApp.save_build.item_detail_set[item_which_set].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[item_which_set].items[i]+`.png">`);
    }
  }
  myApp.item_remove_from_detail= function (item_be_removed){
    console.log(myApp.save_build.item_detail_set[item_which_set].items);
    myApp.save_build.item_detail_set[item_which_set].items.splice(item_be_removed,1);
    console.log(myApp.save_build.item_detail_set[item_which_set].items);
    for (var i = 0; i < myApp.save_build.item_detail_set[item_which_set].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[item_which_set].items[i]+`.png">`);
    }
    $("#item_empty_container-"+myApp.save_build.item_detail_set[item_which_set].items.length).html(`<img  class = "item_empty_icon" src = "../assets/other/item_empty.png">`);
  }
  myApp.check_exist_set = function(){
    for (var i = 0; i < myApp.save_build.item_detail_set.length; i++) {
      console.log(i);
        $('.item_sets_tap').prepend(`<button onclick = "myApp.item_detail_frame(${i})" class = "btn btn-md item_set_button_${i}">Item set #</button>`);
    }
  };
  return myApp;
}))
