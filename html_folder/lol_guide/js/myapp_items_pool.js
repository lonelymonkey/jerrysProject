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
                                  items : ""
                              };
  var second_item_from = "";
  var local_item_set = [];
  var local_item_tags = [];
  var item_which_set =0;
  myApp.item_search = function (){
    var item_keyword = "";
    var item_str = "";
    var reg = "";
    $( "#item_search" ).keyup(function() {
        console.log($("#item_search").val());
        //init the catagory array and ui
      $(".item_cat_check").prop('checked',false);
      local_item_tags = [];
      local_item_set = [];

      $(".item_pool_display").html("");
      item_keyword = $("#item_search").val();
      reg = new RegExp("^" + item_keyword,"i");
      console.log(reg);
      console.log(reg);
      var item_empty = true;
      myApp.items.forEach((e)=>{
        item_str = e.item_name;
        if (reg.test(item_str)) {
          // console.log(e.item_name);
          var  item_block = ` <div class = "item_block" id = "item-${e.item_id}">
                                <div class = "item_icon" data-toggle="popover">
                                  <img onclick = "myApp.item_pool_to_selection(${e.item_id})" src = "../assets/item_icon/`+e.item_id+`.png">
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
          item_empty= false;
        }
        // // console.log(test_reg.test(str));
        //
        // if (test_reg.test(str)) {
        //   console.log(e.item_name);
        //
        // }

      });
      if (item_empty) {
        $(".item_pool_display").html('<div class = "item_not_match">No items match by conditions</div>');

      }

    });

  }

  myApp.items_build_writing_frame = function (){
    var items_guide_frame =
    `<div class = "item_edit_field">
          <div class = "item_sets_tap">
              <button onclick = "myApp.item_add_set()" class = btn btn-md>Set &#43;</button>
          </div>
          <div class = "item_pool_and_choice">
                <div class = "item_choice"></div>
                <div class = "item_pool">
                    <div class = "item_search_field">
                      <div class = "item_search_title">
                          Item Search
                      </div>

                        <input id = "item_search" onclick = "myApp.item_search()" type = "text" placeholder = "Item name...">

                    </div>
                    <div class = "item_pool_selection">
                      <div class = "item_pool_display">
                      </div>
                      <div class = "item_pool_catagory">

                      </div>
                    </div>
                </div>
            </div>
     </div>`;
    $("#pool_and_selection").html(items_guide_frame);
    myApp.check_exist_set();
    item_display_list ();
    item_catagory_list();

  }
  function item_catagory_list (){
    var catagory_frame =  `<div class = "item_cat">
          <div class = "item_cat_list">
            <div class="item_check_box">
             <input class ="item_cat_check" type="checkbox" value="Jungle">
            </div>
            <div class= "item_list_name">Jungle item</div>
          </div>
           <div class="item_list_title">Defense</div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="Health">
              </div>
              <div class= "item_list_name">Health</div>
           </div>
           <div class = "item_cat_list">
             <div class="item_check_box">
              <input class ="item_cat_check" type="checkbox" value="Armor">
             </div>
             <div class= "item_list_name">Armor</div>
           </div>
           <div class = "item_cat_list">
             <div class="item_check_box">
                <input class ="item_cat_check" type="checkbox" value="SpellBlock">
             </div>
             <div class= "item_list_name">Magic Resist</div>
           </div>
           <div class = "item_cat_list">
             <div class="item_check_box">
                <input class ="item_cat_check" type="checkbox" value="HealthRegen">
             </div>
             <div class= "item_list_name">Health Regen</div>
           </div>
         </div>
         <div class = "item_cat">
           <div class="item_list_title">Attack</div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="Damage">
              </div>
              <div class= "item_list_name">Damage</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="CriticalStrike">
              </div>
              <div class= "item_list_name">Critical Strike</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="AttackSpeed">
              </div>
              <div class= "item_list_name">Attack Speed</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="LifeSteal">
              </div>
              <div class= "item_list_name">Life Steal</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="ArmorPenetration">
              </div>
              <div class= "item_list_name">Armor Penetration</div>
           </div>
         </div>
         <div class = "item_cat">
           <div class="item_list_title">Magic</div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="SpellDamage">
              </div>
              <div class= "item_list_name">Ability Power</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="CooldownReduction">
              </div>
              <div class= "item_list_name">Cooldown Reduction</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="Mana">
              </div>
              <div class= "item_list_name">Mana</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="ManaRegen">
              </div>
              <div class= "item_list_name">Mana Regen</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="MagicPenetration">
              </div>
              <div class= "item_list_name">Magic Penetration</div>
           </div>
         </div>
         <div class = "item_cat">
           <div class="item_list_title">Movement</div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="Boots">
              </div>
              <div class= "item_list_name">Boots</div>
           </div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="NonbootsMovement">
              </div>
              <div class= "item_list_name">Others</div>
           </div>
         </div>
         <div class = "item_cat">
           <div class="item_list_title">Comsumables</div>
           <div class = "item_cat_list">
              <div class="item_check_box">
                  <input class ="item_cat_check" type="checkbox" value="Consumable">
              </div>
              <div class= "item_list_name">Consumables</div>
           </div>
         </div>`;
    $(".item_pool_catagory").html(catagory_frame);
    bind_item_check_box_ui();
  }
  function bind_item_check_box_ui(){
    $('.item_cat_check').on('click',function(){
      $("#item_search").val("");
      var item_tag = $(this).val();
      if ($(this).prop("checked")) {
        local_item_tags.push(item_tag);
        console.log(local_item_tags);
      }else {
        var index = local_item_tags.indexOf(item_tag);
        local_item_tags.splice(index, 1);
        console.log(local_item_tags);
      }
      item_filter_by_cat();
    });

  }
  var item_filter_by_cat = function(){
    console.log("test, filter");
    local_item_set = [];
    var count;
    var total_tags = local_item_tags.length;
    for (var i = 0; i < myApp.items.length; i++) {
      count = 0;
        // if local_item_tags us ["Health","Armor"];
        // myApp.items.tags contain both of them will be save into local_item_set
        // if myApp.items.tags.indexOf(e) > -1, count ++,
        // if count = local_item_tags.length, which matches the conditions
      local_item_tags.forEach((e)=>{
        // console.log(e);
        index =  myApp.items[i].tags.indexOf(e);
        if (index > -1) {
          count ++;
        }
      });
      if (count == total_tags) {
        local_item_set.push(myApp.items[i]);
      }
    }
    $(".item_pool_display").html("");
    if (local_item_set.length == 0) {
    $(".item_pool_display").html('<div class = "item_not_match">No items match by conditions</div>');
    }
    for (var i = 0; i < local_item_set.length; i++) {
      var  item_block = ` <div class = "item_block" id = "item-${local_item_set[i].item_id}">
                            <div class = "item_icon" data-toggle="popover">
                              <img onclick = "myApp.item_pool_to_selection(${local_item_set[i].item_id})" src="../assets/item_icon/`+local_item_set[i].item_id+`.png">
                            </div>
                            <div class = "item_name">
                              `+ local_item_set[i].item_name +`
                            </div>
                            <div class = "item_price">
                              `+ local_item_set[i].total_cost +`
                            </div>
                          </div>
                        `;

      $(".item_pool_display").append(item_block);
      item_init_popover(local_item_set[i])
      // console.log(myApp.items[i]._from_);
    }
  }
  function item_display_list (){
    // console.log(myApp.items);
    for (var i = 0; i < myApp.items.length; i++) {
      var  item_block = ` <div class = "item_block" id = "item-${myApp.items[i].item_id}">
                            <div class = "item_icon" data-toggle="popover">
                              <img onclick = "myApp.item_pool_to_selection(${myApp.items[i].item_id})" src = "../assets/item_icon/`+myApp.items[i].item_id+`.png">
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
