(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var rune_category_color = {
    precision : [211,156,89],
    domination : [288,100,115],
    domination : [288,100,115],
    sorcery : [158,110,246],
    resolve : [88,194,80],
    inspiration : [90,164,184],
  }
  var display_get_data_ojb;
  var complete_return_data;
  myApp.display_view_guide = function (build_id){
    console.log("build_id = ", build_id);
    $('.loarding_area').html('<img src = "../assets/other/loader-transparent-85px.gif">');
    myApp_ajax.get_target_build_data(build_id);
  }
  function display_build_ui_structure (obj){
    console.log("the obj selected to view is ",obj);
    var skin_id = obj.build_guide.skin_id;
    // below parts are prototype view for displaying guide
    // using build_id to get all the data(item, rune, etc...) from all the tables
    $(".content").html(`
      <div class = "display_container">
              <div class = "display_background_holder">
              </div>
              <div class = "display_content_holder">
                  <div class = "display_guide_name">
                  </div>
                  <div class = "display_selected_champion_name">
                  </div>
                  <div class = "display_sspell_holder display_border_bottom">
                    <div class = "display_section_title">Summoner Spell Set</div>
                    <div class = "display_sspell_whole_container">
                    </div>
                  </div>
                  <div class = "display_item_rune_container display_border_bottom">
                    <div class = "display_rune_holer">
                      <div class = "display_section_title">Rune</div>
                      <div class = "rune_content_holder">
                        <ul class = "display_css_rune display_primary_rune display_rune_position">
                          <li class = "display_primary_rune_0 display_rune_li_css">
                          </li>
                          <li class = "display_primary_rune_1 display_rune_li_css">
                          </li>
                          <li class = "display_primary_rune_2 display_rune_li_css">
                          </li>
                          <li class = "display_primary_rune_3 display_rune_li_css">
                          </li>
                          <li class = "display_primary_rune_4 display_rune_li_css">
                          </li>
                        </ul>
                        <ul class = "display_css_rune display_secondary_rune display_rune_position">
                          <li class = "display_secondary_rune_0 display_rune_li_css">
                          </li>
                          <li class = "display_secondary_rune_1 display_rune_li_css">
                          </li>
                          <li class = "display_secondary_rune_2 display_rune_li_css">
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class = "display_items_holder">
                      <div class = "display_section_title">Item Build Path</div>
                      <div class = "display_item_check_box">
                        <span class = "item_show_name">Show items' name :</span>
                        <label class="custom-checkbox"><input class="display_item_name" type="checkbox"><span class="checkmark checkmark_display">&nbsp;</span></label>
                      </div>
                    </div>
                  </div>
                  <div class = "display_ability_container display_border_bottom">
                  </div>
                  <div class = "display_threat_container">
                    <div class = "display_section_title">Thread & Diffculty</div>
                    <div class = "display_vs_easy display_vs_css">
                      <div class ="display_level_title ">Easy</div>
                      <div class = "display_vs_content"></div>
                    </div>
                    <div class = "display_vs_medium display_vs_css">
                      <div class ="display_level_title">Medium</div>
                      <div class = "display_vs_content"></div>
                    </div>
                    <div class = "display_vs_hard display_vs_css">
                      <div class ="display_level_title">Hard</div>
                      <div class = "display_vs_content"></div>
                    </div>
                  </div>

              </div>
      </div>`);
      // $(".display_background_holder").css("background-image",`url(../assets/display/${102}/${1}.png)`);
      // background: linear-gradient(to right, transparent, mistyrose)

      $(".display_guide_name").html(obj.build_guide.build_name);
      for (var i = 0; i < myApp.champions.length; i++) {
        if (myApp.champions[i].champion_id == obj.build_guide.champion_id) {
          $(`.display_selected_champion_name`).html(myApp.champions[i].champion_name + " : " +myApp.champions[i].title);
          break;
        }
      }
      $(".display_background_holder").css("background",`radial-gradient(circle closest-corner at 50% 60%,transparent,black),url(../assets/display/${obj.build_guide.champion_id}/${skin_id}.png)`);
      $(".display_background_holder").css("background-size","1200px auto");
      $(".display_background_holder").css("background-repeat","no-repeat");
      display_sspell_section (obj.spell_set)
      display_rune_section (obj.rune_set);
      display_item_section (obj.item_set,obj.item_detail_set);
      display_ability_section(obj.skill_order_table,obj.build_guide.champion_id);
      display_vs_section(obj.against_champion);
      dislay_bind_ui();
      $(".display_note_title").click(function (){
        // $(this).parent().children(".display_note_slide_children").slideToggle("slow");
        $(this).parent().children(".display_note_slide_children").toggle("slide");

      });
  }
  function dislay_bind_ui(){
    $(`.display_item_name`).change(function(){
      var status = $(`input[class = "display_item_name"]:checked`).length;
      if (status == 1) {
        $(".display_item_detail_name").show();
      }else {
        $(".display_item_detail_name").hide();

      }
    });
  }
  function display_vs_section(against_champion){
    var vs_level_container = {
    easy :[],
    medium :[],
    hard :[]
    };
    champion_name = "";
    note = "";

    console.log("against_champion.length",against_champion.length);
    $(".display_level_title").click(function (){
      console.log("I am clicked my child is ",$(this).children(".display_vs_content"));
      $(this).parent().children(".display_vs_content").slideToggle("slow");
    });
    var level = Object.keys(vs_level_container);
    console.log("against_champion.isArray" , against_champion.isArray);
    if (Array.isArray(against_champion)) {
      for (var i = 0; i < against_champion.length; i++) {
        if (against_champion[i].diffculty < 3) {
          // console.log("it is easy, level ",against_champion[i].diffculty);
          vs_level_container.easy.push(against_champion[i]);
        }else if (against_champion[i].diffculty >= 3 && against_champion[i].diffculty < 7) {
          // console.log("it is medium, level ",against_champion[i].diffculty);
          vs_level_container.medium.push(against_champion[i]);

        }else {
          // console.log("it is hard, level ",against_champion[i].diffculty);
          vs_level_container.hard.push(against_champion[i]);
        }
      }
    }
    else {
      if (against_champion.diffculty < 3) {
        // console.log("it is easy, level ",against_champion[i].diffculty);
        vs_level_container.easy.push(against_champion);
      }else if (against_champion.diffculty >= 3 && against_champion.diffculty < 7) {
        // console.log("it is medium, level ",against_champion[i].diffculty);
        vs_level_container.medium.push(against_champion);

      }else {
        // console.log("it is hard, level ",against_champion[i].diffculty);
        vs_level_container.hard.push(against_champion);
      }
    }

    for (var i = 0; i < level.length; i++) {
      console.log(vs_level_container.hard);
      if (vs_level_container[level[i]].length == 0) {
        console.log("this diffculty level has no champion",level[i]);
        $(`.display_vs_${level[i]}`).css("display","none");

      }else {
        $(`.display_vs_${level[i]}`).css("display","block");

      }
      for (var j = 0; j < vs_level_container[level[i]].length; j++) {
        for (var k = 0; k < myApp.champions.length; k++) {

          if (vs_level_container[level[i]][j].champion_id == myApp.champions[k].champion_id) {
            console.log("champion_name is",champion_name);
            champion_name = myApp.champions[k].champion_name;
            break;
          }
        }
        var display_treat_level = Number(vs_level_container[level[i]][j].diffculty)+1;

        var vs_thread_ui_frame = `
          <div class = "display_vs_set">
            <div class = "display_vs_champion_icon">
              <img src = "../assets/champion_icon/${vs_level_container[level[i]][j].champion_id}.png">
            </div>
            <div class = "display_vs_treat_level_section">
              <div class = "display_vs_champion_name">${champion_name}</div>
              <div class = "display_vs_threat_level_bar_${vs_level_container[level[i]][j].diffculty}">
              </div>
            </div>


          </div>
          <div class = "display_note_slide "><div class = "display_note_title display_note_title_thread">Note</div><div class = "display_note_slide_children display_note_block display_vs_note"></div></div>

        `;
        $(`.display_vs_${level[i]} .display_vs_content`).append(vs_thread_ui_frame);
        note = display_note_handler(vs_level_container[level[i]][j].note_id);
        $(`.display_vs_note`).html(note);

      }
    }
  }
  function display_ability_section(skill_order,champion_id){
    var skill_container = ["q","w","e","r"];
    var skill_info;
    var note = "";
    console.log("skill order is ",skill_order);
    var display_ability_frame = `
    <div class = display_ability_content_holder>
      <div class = "display_ability_title">
      SKill Level-up Order
      </div>

      <div class = "display_ability_passive display_ability_list_frame">
      </div>
      <div class = "display_ability_q display_ability_list_frame">
      </div>
      <div class = "display_ability_w display_ability_list_frame">

      </div>
      <div class = "display_ability_e display_ability_list_frame">

      </div>
      <div class = "display_ability_r display_ability_list_frame">

      </div>
    </div>
    <div class = "display_note_slide "><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_ability_note"></div></div>
    `;
    var display_ability_check_list;
    $(".display_ability_container").html(display_ability_frame);

    for (var i = 0; i < skill_container.length; i++) {
      $(`.display_ability_${skill_container[i]}`).html(`<div data-toggle = "popover" class = "display_ability_icon"><img src = "../assets/skill/${champion_id}/${i}.png"></div>`);
      skill_info = display_get_ability_info(champion_id,i);
      display_ability_init_popover(skill_info);
    }
    for (var i = 0; i < skill_order.order_list.length; i++) {
      $(".display_ability_list_frame").append(`<div class = "display_ability_checkbox_css display_ability_checkbox_${i}"></div>`);
      $(`.display_ability_${skill_order.order_list[i]} .display_ability_checkbox_${i}`).html(`<div class = "display_ability_level_text">${i+1}</div>`);
      $(`.display_ability_${skill_order.order_list[i]} .display_ability_checkbox_${i}`).addClass("display_ability_selected");
      $(`.display_ability_${skill_order.order_list[i]} .display_ability_checkbox_css.display_ability_checkbox_${i}`).css("background-color","green");



    }
    $(".display_ability_passive").html(`<div data-toggle = "popover" class = "display_ability_icon"></div>`);
    $(`.display_ability_passive .display_ability_icon`).html(`<img src = "../assets/skill/${champion_id}/4.png">`);
    skill_info = display_get_ability_info(champion_id,4);
    display_ability_init_popover(skill_info);
    note = display_note_handler(skill_order.note_id);
    $(`.display_ability_note`).html(note);


  }
  function display_get_ability_info(champion_id,skill_id){
    var skill_info = {champion_id :0,id:0,name:"",description:""};
    for (var i = 0; i < myApp.champions.length; i++) {
      if (myApp.champions[i].champion_id ==  champion_id) {
        skill_info.champion_id = myApp.champions[i].champion_id;
        skill_info.id = skill_id;
        skill_info.name = myApp.champions[i].data[skill_id].name;
        skill_info.description = myApp.champions[i].data[skill_id].description;
        break;
      }
    }
    return skill_info;
  }
  function display_sspell_section (sspell_set){
    // console.log(sspell_set);
    var note = "";
    var spell_info;

    spell_info = display_get_spell_info(sspell_set.spell_id_1);
    $(".display_sspell_whole_container").append(`<div data-toggle = "popover" class = "display_sspell_container"><img src = "../assets/sspell_icon/${sspell_set.spell_id_1}.png"></div>`);
    display_init_popover("sspell_icon",spell_info);
    spell_info = display_get_spell_info(sspell_set.spell_id_2);
    $(".display_sspell_whole_container").append(`<div data-toggle = "popover" class = "display_sspell_container"><img src = "../assets/sspell_icon/${sspell_set.spell_id_2}.png"></div>`);
    display_init_popover("sspell_icon",spell_info);
    $(".display_sspell_whole_container").append(`<div class = "display_note_slide display_sspell_note_container"><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_sspell_note_block"></div></div>`);
    note = display_note_handler(sspell_set.note_id);
    $(`.display_note_block`).html(note);

  }
  function display_get_spell_info (spell_id){
    var spell_info = {id:0,name:"",description:""}
    for (var i = 0; i < myApp.spells.length; i++) {
      if (myApp.spells[i].spell_id == spell_id) {
        spell_info.id = spell_id;
        spell_info.name = myApp.spells[i].spell_name;
        spell_info.description = myApp.spells[i].spell_data.description;
        break;
      }
    }
    return spell_info;
  }
  function display_rune_section (rune_set){
    var rune_set_key = Object.keys(rune_set);
    var primary_rune_category = rune_set.primary_rune[0];
    var secondary_rune_category = rune_set.secondary_rune[0];
    var rune_info;
    var rune_note;
    var rune_content = {id:0,name:"",description:""};
    for (var i = 0; i < rune_set_key.length; i++) {
      // console.log(rune_set_key[i]);
      // console.log(rune_set[rune_set_key[i]]);
      if (rune_set_key[i] == "primary_rune" || rune_set_key[i] =="secondary_rune") {
        for (var j = 0; j < rune_set[rune_set_key[i]].length; j++) {
          // console.log(rune_set[rune_set_key[i]][j]);
          if (rune_set_key[i] == "primary_rune") {
            rune_info = display_get_rune_info(primary_rune_category,rune_set[rune_set_key[i]][j]);
            if (typeof rune_info != "number") {
              display_rune_name = rune_info.rune_name;
            }else {
              display_rune_name = primary_rune_category;

            }
            // console.log("the position,",j);
            $(".display_primary_rune_"+j).append(`<div class = "display_rune_container"><div data-toggle= "popover" class = "display_css_rune_pool"><img src = "../assets/runes_icon/${rune_set[rune_set_key[i]][j]}.png"></div><div class = "rune_title_name">${display_rune_name}</div></div>`);
            if (typeof rune_info != "number") {
              // console.log(rune_info);
              rune_content.id = rune_info.rune_id;
              rune_content.name = rune_info.rune_name;
              rune_content.description = rune_info.description;
              display_init_popover("runes_icon",rune_content);
            }else {
              $(".display_css_rune_pool").removeAttr("data-toggle");
              $(".display_primary_rune_"+j+" .display_css_rune_pool").addClass("display_remove_cursor");
            }
            $(".display_primary_rune .rune_title_name").css('color',"rgba("+rune_category_color[primary_rune_category][0]+", "+rune_category_color[primary_rune_category][1]+", "+rune_category_color[primary_rune_category][2]+", 1)")

          }else {
            rune_info = display_get_rune_info(secondary_rune_category,rune_set[rune_set_key[i]][j]);

            if (typeof rune_info != "number") {
              display_rune_name = rune_info.rune_name;
            }else {
              display_rune_name = secondary_rune_category;

            }
            // console.log("the secondary position,",j);
            $(".display_secondary_rune_"+j).append(`<div class = "display_rune_container"><div data-toggle= "popover" class = "display_css_rune_pool"><img src = "../assets/runes_icon/${rune_set[rune_set_key[i]][j]}.png"></div><div class = "rune_title_name">${display_rune_name}</div></div>`);
            if (typeof rune_info != "number") {
              // console.log(rune_info);
              rune_content.id = rune_info.rune_id;
              rune_content.name = rune_info.rune_name;
              rune_content.description = rune_info.description;
              display_init_popover("runes_icon",rune_content);

            }
            else {
              $(".display_css_rune_pool").removeAttr("data-toggle");
              $(".display_secondary_rune_"+j+" .display_css_rune_pool").addClass("display_remove_cursor");

            }
            $(".display_secondary_rune .rune_title_name").css('color',"rgba("+rune_category_color[secondary_rune_category][0]+", "+rune_category_color[secondary_rune_category][1]+", "+rune_category_color[secondary_rune_category][2]+", 1)")

          }
        }
      }else {
        continue;
      }

    }
    rune_note = display_note_handler(rune_set.note_id)
    $(".display_primary_rune .display_css_rune_pool").css('border-color',"rgba("+rune_category_color[primary_rune_category][0]+", "+rune_category_color[primary_rune_category][1]+", "+rune_category_color[primary_rune_category][2]+", 1)")
    $(".display_secondary_rune .display_css_rune_pool").css('border-color',"rgba("+rune_category_color[secondary_rune_category][0]+", "+rune_category_color[secondary_rune_category][1]+", "+rune_category_color[secondary_rune_category][2]+", 1)")
    $(".display_rune_holer").append(`<div class = "display_note_slide "><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_rune_note"></div></div>`);
    $(`.display_rune_note`).html(rune_note);


  }
  function display_item_section (item,detail){
    // console.log(item);
    // console.log(detail);
    var item_set_name;
    var item_note_id;
    var item_info_data;
    var note = "";
    if (Array.isArray(item)) {
      for (var i = 0; i < item.length; i++) {
        item_set_name = item[i].set_name;
        item_note_id = item[i].note_id;
        var item_structure  = `
        <div class = "item_set_container_css item_set_container_${i}">
          <div class = "item_set_title">${item_set_name}</div>
          <div class = "display_item_detail"></div>
          <div class = "display_title_note_holder">
            <div class = "display_note_slide "><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_item_note"></div></div>
          </div>
        </div>
        `;
        $(".display_items_holder").append(item_structure);
        note = display_note_handler(item_note_id);
        $(`.item_set_container_${i} .display_item_note`).html(note);
      }
    }else {
      item_set_name = item.set_name;
      item_note_id = item.note_id;
      var item_name = "";
      var item_structure  = `
      <div class = "item_set_container_css item_set_container_${i}">
        <div class = "item_set_title">${item_set_name}</div>
        <div class = "display_item_detail"></div>
        <div class = "display_title_note_holder">
          <div class = "display_note_slide "><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_item_note"></div></div>
        </div>
      </div>
      `;
      $(".display_items_holder").append(item_structure);
      note = display_note_handler(item_note_id);
      $(`.item_set_container_${0} .display_item_note`).html(note);
    }
    // $(".display_rune_holer").append(`<div class = "display_note_slide "><div class = "display_note_title">Note</div><div class = "display_note_slide_children display_note_block display_rune_note"></div></div>`);

    for (var i = 0; i < detail.length; i++) {
      for (var j = 0; j < detail[i].items.length; j++) {
        for (var k = 0; k < myApp.items.length; k++) {
          if (myApp.items[k].item_id == detail[i].items[j]) {
            item_name = myApp.items[k].item_name;
            break;
          }
        }
        $(`.item_set_container_${i} .display_item_detail`).append(`<div class = "display_item_block"><div data-toggle = "popover" class = "display_item_detail_frame"><img  img src = "../assets/item_icon/${detail[i].items[j]}.png"></div><div class = "display_item_detail_name">${item_name}</div></div>`);
        item_info_data = display_get_item_info(detail[i].items[j]);
        display_init_popover("item_icon",item_info_data);
        // console.log(item_info_data);
      }
    }
  }
  function display_get_item_info(item_id){
    var item_info = {id:0,name:"",description:""};
    for (var i = 0; i < myApp.items.length; i++) {
      if (myApp.items[i].item_id == item_id) {
        item_info.id = myApp.items[i].item_id;
        item_info.name = myApp.items[i].item_name;
        item_info.description = myApp.items[i].description;
        break;
      }
    }
    return item_info;
  }
  function display_note_handler(note_id){
    var default_note = "The author did not leave any note in this section";
    for (var i = 0; i < display_get_data_ojb.note.length; i++) {
      if (display_get_data_ojb.note[i].note_id == note_id) {
        if (display_get_data_ojb.note[i].note == "") {
          return default_note;
        }else {
          return display_get_data_ojb.note[i].note;

        }
      }
    }
  }
  function display_get_rune_info (category, id){
    var desire_data = 0;
    for (var i = 0; i < myApp.runes[category].length; i++) {
      if (myApp.runes[category][i].rune_id == id) {
        desire_data = myApp.runes[category][i];
        break;
      }
    }
    // console.log(desire_data);
    return desire_data;
  }
  function display_init_popover (category,popover_content){
    // console.log(popover_content.description);
    var position = "bottom"
    var content_frame = `<div class="media sspell_popover">
                              <div class = "sspell_popover_icon">
                                <img src="../assets/${category}/`+popover_content.id+`.png"class="media-object" alt="Sample Image">
                              </div>
                              <div class="media-body sspell_popover_description">
                                  <h4 class="media-heading sspell_popover_name">`+popover_content.name+`</h4>
                                  <div class = "sspell_popover_detail">`+popover_content.description+`</div>
                              </div>
                           </div>`;
    if (category == "item_icon") {
      position = "top";

    }
    $('[data-toggle="popover"]').popover({
        placement : position,
        trigger : 'hover',
        html : true,
        content : content_frame
      });
  }
  function display_ability_init_popover (popover_content){
    // console.log(popover_content.description);
    var position = "top"
    var content_frame = `<div class="media sspell_popover">
                              <div class = "sspell_popover_icon">
                                <img src="../assets/skill/${popover_content.champion_id}/`+popover_content.id+`.png"class="media-object" alt="Sample Image">
                              </div>
                              <div class="media-body sspell_popover_description">
                                  <h4 class="media-heading sspell_popover_name">`+popover_content.name+`</h4>
                                  <div class = "sspell_popover_detail">`+popover_content.description+`</div>
                              </div>
                           </div>`;
    $('[data-toggle="popover"]').popover({
        placement : position,
        trigger : 'hover',
        html : true,
        content : content_frame
      });
  }
  function display_note_popover (note_id){
    var item_note;
    item_note = display_note_handler(note_id);

    var content_frame = `<div class="media sspell_popover">
                              <div class="media-body sspell_popover_description display_note_popover_css">
                                  <div class = "sspell_popover_detail">`+item_note+`</div>
                              </div>
                           </div>`;

     $('[data-toggle="popover"]').popover({
         placement : 'bottom',
         trigger : 'hover',
         html : true,
         content : content_frame
       });
  }
  myApp.display_get_build_detail = function (obj){
    // console.log("the return obj is ",obj);
    display_get_data_ojb = obj;
    display_build_ui_structure (obj)
  }
  return myApp;
}))
