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
  var item_selected_order = 0;
  var bind_set_name_ui = function(set_number){
    $( "#item_set_name-"+set_number).keyup(function() {
      console.log("we are set # "+ set_number);

      console.log($("#item_set_name-"+set_number).val());
      myApp.save_build.item_set[set_number].set_name = $("#item_set_name-"+set_number).val();
      console.log(myApp.save_build.item_set);
    });
  }





  myApp.item_add_set = function () {
    var local_set_number = myApp.item_set_number
    $('.item_sets_tap').prepend('<button onclick = "myApp.item_detail_frame('+local_set_number+')" class = btn btn-md>Item set # '+myApp.item_set_number+'</button>');
    myApp.item_set_number ++;
    // console.log("item add set");
    // console.log(JSON.stringify(myApp.save_build));
    myApp.save_build.item_set.push({
                                item_set_id : 0,
                                set_name : "",
                                note_id : 0,
                                remove : false
                            });
    myApp.save_build.item_detail_set.push({
                                    detail_id : 0,
                                    item_set_id : 0,
                                    items : []
                                });
    // console.log(myApp.save_build);
  }
  myApp.item_detail_frame = function (set_number){
    $(".item_choice").html("");
    var item_choice_frame = `
                        <div class = "item_set_name">
                            <span>item set Name: </span> <input id = "item_set_name-${set_number}" type = "text" placeholder = "Enter set name...">
                        </div>
                        <div class = "item_chosen">
                          <div class = "item_empty_icon_field"></div>
                        </div>
                        <div class = "item_core_set">
                          Core item : <input type="checkbox" value="core" id="item_core_${set_number}">
                        </div>
                        <div class = "item_notes">
                            <div class = "item_notes_title">
                                Notes
                            </div>
                            <div class = "item_notes_writing_area">
                                <textarea rows="8" cols="52" id ="item_notes_${set_number}"></textarea>
                            </div>
                        </div>`;
    $(".item_pool_and_choice").show();
    $(".item_choice").html(item_choice_frame);
    item_which_set = set_number;
    bind_set_name_ui(set_number);
    item_add_emtpy_icon();
    console.log("I am in item set # " + item_which_set);
    console.log("the item set name is " + myApp.save_build.item_set[set_number].set_name);
    $("#item_set_name-"+set_number).val(myApp.save_build.item_set[set_number].set_name);
    for (var i = 0; i < myApp.save_build.item_detail_set[item_which_set].items.length; i++) {
      $("#item_empty_container-"+i).html(`<img onclick ="myApp.item_remove_from_detail(${i})" class = "item_empty_icon" src = "../assets/item_icon/`+myApp.save_build.item_detail_set[item_which_set].items[i]+`.png">`);
    }
  }

  function item_add_emtpy_icon () {
    for (var i = 0; i < 24; i++) {
      $(".item_empty_icon_field").append(`<div class = "item_empty_container" id = "item_empty_container-${i}"><img class = "item_empty_icon" id = "item_empty_icon-${i}" src = "../assets/other/item_empty.png"></div>`);
    }
  }
  myApp.item_pool_to_selection = function (item_id){
    console.log("the select item id is " + item_id);
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
  return myApp;
}))
