(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var item_set_structure = {
                              item_set_id : 0,
                              set_name : "dummy set name",
                              note_id : 0,
                              remove : false
                          };
  var item_detail_structure = {
                                  detail_id : 0,
                                  item_set_id : 0,
                                  items : ""
                              };
  var second_item_from = "";

  myApp.item_search = function (){
    var item_keyword = "";
    var item_str = "";
    var reg = "";
    $( "#item_search" ).keyup(function() {
        // console.log($("#item_search").val());
      $(".item_pool_display").html("");
      item_keyword = $("#item_search").val();
      reg = new RegExp("^" + item_keyword,"i");
      console.log(reg);
      console.log(reg);
      myApp.items.forEach((e)=>{
        item_str = e.item_name;
        if (reg.test(item_str)) {
          console.log(e.item_name);
          var  item_block = ` <div class = "item_block" id = "item-${e.item_id}">
                                <div class = "item_icon" data-toggle="popover">
                                  <img src = "../assets/item_icon/`+e.item_id+`.png">
                                </div>
                                <div class = "item_name">
                                  `+ e.item_name +`
                                </div>
                                <div class = "item_price">
                                  `+ e.total_cost +`
                                </div>
                              </div>
                            `;
          $(".item_pool_display").append(item_block);
          item_init_popover(e);
        }
        // // console.log(test_reg.test(str));
        //
        // if (test_reg.test(str)) {
        //   console.log(e.item_name);
        //
        // }

      });

    });

  }
  myApp.items_build_writing_frame = function (){
    var items_guide_frame =
    `<div class = "item_edit_field">
          <div class = "item_sets_tap">
              <button onclick = "myApp.item_add_set()" class = btn btn-md>Set &#43;</button>
          </div>
          <div class = "item_pool_and_choice">
                <div class = "item_choice">
                    <div class = "item_set_name">
                        item set Name : <input id = "item_set_name" type = "text" placeholder = "Enter set name...">
                    </div>
                    <div class = "item_chosen">
                        this will be item chosen
                    </div>
                    <div class = "item_core_set">
                      Core item : <input type="checkbox" value="core">
                    </div>
                    <div class = "item_notes">
                        <div class = "item_notes_title">
                            Notes
                        </div>
                        <div class = "item_notes_writing_area">
                            <textarea rows="4" cols="50"></textarea>
                        </div>
                    </div>
                </div>
                <div class = "item_pool">
                    <div class = "item_search_field">
                      <div class = "item_search_title">
                          Item Search
                      </div>
                      <div class = "item_search_input">
                        <input id = "item_search" onclick = "myApp.item_search()" type = "text" placeholder = "Item name...">
                      </div>
                    </div>
                    <div class = "item_pool_selection">
                      <div class = "item_pool_display">

                      </div>
                      <div class = "item_pool_catagory">
                          item_pool_catagory
                      </div>
                    </div>
                </div>
            </div>
     </div>`;
    $("#pool_and_selection").html(items_guide_frame);
    item_display_list ();

  }
  function item_display_list (){
    // console.log(myApp.items);
    for (var i = 0; i < myApp.items.length; i++) {
      var  item_block = ` <div class = "item_block" id = "item-${myApp.items[i].item_id}">
                            <div class = "item_icon" data-toggle="popover">
                              <img src = "../assets/item_icon/`+myApp.items[i].item_id+`.png">
                            </div>
                            <div class = "item_name">
                              `+ myApp.items[i].item_name +`
                            </div>
                            <div class = "item_price">
                              `+ myApp.items[i].total_cost +`
                            </div>
                          </div>
                        `;
      $(".item_pool_display").append(item_block);
      item_init_popover(myApp.items[i])
      // console.log(myApp.items[i]._from_);
    }
    // console.log("item name in the div is "+$(".item_name").text());
  }
  myApp.item_add_set = function () {
    $('.item_sets_tap').prepend('<button onclick = "myApp.item_detail_frame('+myApp.item_set_number+')" class = btn btn-md>Item set # '+myApp.item_set_number+'</button>');
    myApp.item_set_number ++;
    // console.log("item add set");
    // console.log(JSON.stringify(myApp.save_build));
    myApp.save_build.item_set.push(item_set_structure);
    myApp.save_build.item_detail_set.push(item_detail_structure);
    // console.log(myApp.save_build);
  }
  myApp.item_detail_frame = function (set_number){
    $(".item_pool_and_choice").show();
  }
  function check_2nd_layer (item_id) {
      // console.log("the item id which may have2nd layer is " + item_id);

      var item_from = $.map(myApp.items, function(value) {
      return [value];
      });
      // console.log(item_from);
      item_from.forEach((e) =>{
        if (e.item_id == item_id) {
          if (e._from_ != null) {
            second_item_from = e._from_;
          }

        }
      });
  }
  item_init_popover = function (popover_content){
    var view = "";
    var item_from = popover_content._from_;
    var sec_laryer_item_from;
    // console.log(item_from);

    // console.log(item_from);
    if (item_from == null) {
      console.log("emptyarray");
    }else {
      item_from.forEach((e) =>{
        path = "../assets/item_icon/"+e+".png";
        view += `<div class = "first layer">
                    <img id = id="item-${e}" src="${path}" alt = ${e}>
                </div>`;
        check_2nd_layer(e);
        // console.log(second_item_from);

        if (second_item_from != "") {
          $.each(second_item_from, function( key, value ) {
            sec_path = "../assets/item_icon/"+value+".png";
            // console.log(key+": "+value);
            view += `<div class = "second layer">
                        <img id = id="item-${value}" src="${sec_path}" alt = ${value}>
                    </div>`;
          });
        }
        second_item_from = "";
      });
    }
    var content_frame = `<div class="media item_popover">
                            <div class = "item_popover_icon">
                              <img src="../assets/item_icon/`+popover_content.item_id+`.png"class="media-object" alt="Sample Image">
                            </div>
                            <div class = "item_tree">
                              `+view+`
                            </div>
                            <div class="media-body item_popover_description">
                                <h4 class="media-heading item_popover_name">`+popover_content.item_name+`</h4>
                                <div class = "item_popover_detail">`+popover_content.description+`</div>
                            </div>
                         </div>`;
    $('[data-toggle="popover"]').popover({
        placement : 'right',
        trigger : 'hover',
        html : true,
        content : content_frame
      });
  }
  return myApp;
}))
