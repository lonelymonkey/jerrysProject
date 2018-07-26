(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var first_spell_on = false;
  var second_spell_on = false;
  var primary_flag = false;
  var secondary_flag = false;
  var first_time_build_pri = true;
  var first_time_build_sec = true;
  myApp.rune_clean = false;
  var rune_detect =
  {
    primary : false,
    secondary:false
  };
  var pri_selected = {
    keystone : [],
    tier1 :[],
    tier2 :[],
    tier3 :[],
  };
  var sec_selected = {
    tier1  :[],
    tier2 :[],
    tier3 :[],
  };
  var sec_rune_detect_obj ={
    first:0,
    second:0
  };
  var rune_count = 0.3;
  var rune_count_flag = true;
  var rune_category_color = {
    precision : [211,156,89],
    domination : [288,100,115],
    domination : [288,100,115],
    sorcery : [158,110,246],
    resolve : [88,194,80],
    inspiration : [90,164,184],
  }
  var primary_interval;
  var secondary_interval;
  var rune_note_string_count = 0

  myApp.runes_build_writing_frame = function (){
    // console.log("primary_flag",primary_flag);
    // console.log("secondary_flag",secondary_flag);

    var rune_frame =
    `
      <div class = "rune_pool_container">
        <div class = "rune_category">
            Choose a path
        </div>
        <div class = "rune_pool" id = "rune_category_precision">
          <img onclick = "myApp.rune_select_rune('precision')" src = "../assets/runes_icon/precision.png">
        </div>
        <div class = "rune_pool" id = "rune_category_domination">
          <img onclick = "myApp.rune_select_rune('domination')" src = "../assets/runes_icon/domination.png">
        </div>
        <div class = "rune_pool" id = "rune_category_sorcery">
          <img onclick = "myApp.rune_select_rune('sorcery')" src = "../assets/runes_icon/sorcery.png">
        </div>
        <div class = "rune_pool" id = "rune_category_resolve">
          <img onclick = "myApp.rune_select_rune('resolve')" src = "../assets/runes_icon/resolve.png">
        </div>
        <div class = "rune_pool" id = "rune_category_inspiration">
          <img onclick = "myApp.rune_select_rune('inspiration')" src = "../assets/runes_icon/inspiration.png">
        </div>

      </div>
      <div class = "rune_selection_field">
        <div>
          <div class = "rune_selected_category" id = "rune_primary">
            <div class = "primary_rune_container">
              <div class = "rune_selection_category" id = "primary_rune_category">

              </div>
              <div class = "rune_selection rune_inactive" id = "1-0">
                <div class = "rune_loading rune_decision"></div>
              </div>
              <div class = "rune_selection rune_inactive" id = "1-1">
                <div class = "rune_loading rune_decision"></div>
              </div>
              <div class = "rune_selection rune_inactive" id = "1-2">
                <div class = "rune_loading rune_decision"></div>
              </div>
              <div class = "rune_selection rune_inactive" id = "1-3">
                <div class = "rune_loading rune_decision"></div>
              </div>
            </div>
          </div>
          <div class = "rune_selected_category" id = "rune_secondary">
            <div class = "secondary_rune_container">
              <div class = "rune_selection_category" id = "secondary_rune_category">

              </div>
              <div class = "rune_selection rune_inactive" id = "2-1">
                <div class = "rune_loading rune_sec_decision_field">
                  <div class = "rune_decision"></div>
                </div>
              </div>
              <div class = "rune_selection rune_inactive" id = "2-2">
                <div class = "rune_loading rune_sec_decision_field">
                  <div class = "rune_decision"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class = "rune_note_field">
          <div>Note :</div>
          <textarea class = "form-control rune_input_note note_control" cols = "30" rows = "5"></textarea>
          <div class = "rune_note_count note_count_css">${rune_note_string_count}/600</div>
      </div>
    `;
    $("#pool_and_selection").html(rune_frame);
    if (myApp.create_flag || myApp.rune_clean) {
      secondary_flag = false;
      primary_flag = false;
      clearInterval(primary_interval);
      clearInterval(secondary_interval);
      first_time_build_pri = true;
      first_time_build_sec = true;
      myApp.create_flag = false;
      pri_selected = {
        keystone : [],
        tier1 :[],
        tier2 :[],
        tier3 :[],
      };
      sec_selected = {
        tier1  :[],
        tier2 :[],
        tier3 :[],
      };
    }
      rune_restore();
      $('.note_count_css').html(`${$('.note_control').val().length}/600`);
      myApp.rune_bind_ui("all");
      rune_bind_note_ui();




  }
  function rune_bind_note_ui (){
    $(".rune_input_note").keyup(function(){
      myApp.save_build.rune_set.note = $(".rune_input_note").val();
      rune_note_string_count =  $(".rune_input_note").val().length;
      $('.rune_note_count').html(`${rune_note_string_count}/600`);
      console.log(myApp.save_build.rune_set);
    });

  }
  function rune_restore(){
    $(".rune_input_note").val(myApp.save_build.rune_set.note);

    if (myApp.save_build.rune_set.primary_rune[0]!="" && myApp.save_build.rune_set.primary_rune.length != 0) {
      console.log("the primary rune is ",myApp.save_build.rune_set.primary_rune);

      primary_flag = false;
      myApp.rune_select_rune(myApp.save_build.rune_set.primary_rune[0]);
      // myApp.rune_bind_ui("left");
      for (var i = 1; i < myApp.save_build.rune_set.primary_rune.length; i++) {
        // myApp.rune_click_to_select = function (id,type,section)
        // console.log(typeof myApp.save_build.rune_set.primary_rune[i]);

        if (myApp.save_build.rune_set.primary_rune[i] == 0) {
          continue;
        }else {
          myApp.rune_click_to_select(myApp.save_build.rune_set.primary_rune[i],i-1,1);
        }
      }
    }
    if (myApp.save_build.rune_set.secondary_rune[0]!="" &&　 myApp.save_build.rune_set.secondary_rune.length != 0) {
      console.log("the secondary rune is ",myApp.save_build.rune_set.secondary_rune);

      secondary_flag = false;
      if (myApp.save_build.rune_set.primary_rune.length == 0) {
        primary_flag = true;
        myApp.rune_select_rune(myApp.save_build.rune_set.secondary_rune[0]);
        primary_flag = false;
      }else {
        myApp.rune_select_rune(myApp.save_build.rune_set.secondary_rune[0]);

      }
      for (var i = 1; i < myApp.save_build.rune_set.secondary_rune.length; i++) {
        console.log(myApp.save_build.rune_set.secondary_rune);
        console.log(myApp.save_build.rune_set.secondary_rune[i]);

        if (myApp.save_build.rune_set.secondary_rune[i] == 0) {
          continue;
        }else {
          console.log("test the rune store secondary");
          myApp.rune_click_to_select(myApp.save_build.rune_set.secondary_rune[i],i,2);
        }
      }
    }
  }
  myApp.rune_bind_ui = function(part){
    switch (part) {
      case "right":
        $(".secondary_rune_container .rune_loading").each(function(){
          $(this).on("click",function(){
            $(this).addClass("rune_test_function");
            console.log("this is parent", $(this).parent().html());
            console.log("this is parent", $(this).parent());

            console.log("this is child", $(this));

            var rune_sec_type_id =  $(this).parent().attr("id");

            console.log("type and sec is " + rune_sec_type_id);

            var section = rune_sec_type_id.charAt(0);
            var type = rune_sec_type_id.slice(-1);
            console.log(section);
            if (section == 1) {
              console.log("I am primary");
              rune_expand_pri_selection(type,section);
            }else if (section == 2) {
              console.log("I am secodary");
              rune_expand_sec_selection(type,section);

            }

          });

        });
        break;
      case "left":
        $(".primary_rune_container .rune_loading").each(function(){
          $(this).on("click",function(){
            $(this).addClass("rune_test_function");
            console.log("this is parent", $(this).parent().html());
            console.log("this is parent", $(this).parent());

            console.log("this is child", $(this));

            var rune_sec_type_id =  $(this).parent().attr("id");

            console.log("type and sec is " + rune_sec_type_id);

            var section = rune_sec_type_id.charAt(0);
            var type = rune_sec_type_id.slice(-1);
            console.log(section);
            if (section == 1) {
              console.log("I am primary");
              rune_expand_pri_selection(type,section);
            }else if (section == 2) {
              console.log("I am secodary");
              rune_expand_sec_selection(type,section);

            }

          });

        });
        break;
      default:
      $(".rune_loading").each(function(){
        $(this).on("click",function(){
          $(this).addClass("rune_test_function");
          console.log("this is parent", $(this).parent().html());
          console.log("this is parent", $(this).parent());

          console.log("this is child", $(this));

          var rune_sec_type_id =  $(this).parent().attr("id");

          console.log("type and sec is " + rune_sec_type_id);

          var section = rune_sec_type_id.charAt(0);
          var type = rune_sec_type_id.slice(-1);
          console.log(section);
          if (section == 1) {
            console.log("I am primary");
            rune_expand_pri_selection(type,section);
          }else if (section == 2) {
            console.log("I am secodary");
            rune_expand_sec_selection(type,section);

          }

        });

      });
    }

  }

  function rune_expand_sec_selection(type,section){
    console.log(sec_selected);
    var rune_content = sec_selected[Object.keys(sec_selected)[type]];
    console.log(rune_content);
    var rune_sec_origin = `<div class = "rune_sec_decision_field">
                              <img src = "../assets/other/loader-transparent-85px.gif">
                            </div>`;
    var rune_sec_expand_div = `
      <div class = "rune_sec_expand">
        <div id ="${type}-sec_tier1"></div>
        <div id ="${type}-sec_tier2"></div>
        <div id ="${type}-sec_tier3"></div>
      </div>
    `;
    var temp = "";
    var count = 0;
    $("#"+section+"-"+type).html(rune_sec_origin + rune_sec_expand_div);
    Object.keys(sec_selected).forEach((e)=>{
      count ++;
      // console.log(e);
      // console.log(sec_selected[e]);
      temp = "";
      sec_selected[e].forEach((e1)=>{
        // console.log(e1);
        temp = temp + `<img class = "rune_html_expand_section" onclick = "myApp.rune_click_to_select(${e1.rune_id},${type},${section}); myApp.rune_sec_detect(${count},${type});" src = "../assets/runes_icon/${e1.rune_id}.png">`;
      });
      // console.log(temp);
      $("#"+type+"-sec_"+e).html(temp);
    });
    $(".secondary_rune_container .rune_html_expand_section").css('border-color',"rgba("+rune_category_color[rune_detect.secondary][0]+", "+rune_category_color[rune_detect.secondary][1]+", "+rune_category_color[rune_detect.secondary][2]+", 0.8)");

    $("#2-1 #1-sec_tier"+sec_rune_detect_obj.second).addClass("rune_sec_disable");
    $("#2-2 #2-sec_tier"+sec_rune_detect_obj.first).addClass("rune_sec_disable");

  }
  myApp.rune_sec_detect = function(tier_number,type){
    console.log("the tier number is " + tier_number);
    console.log("the type (row) is " +　type);
    console.log(sec_rune_detect_obj);
    if (type == 1) {
      $("#2-2 #2-sec_tier"+sec_rune_detect_obj.first).removeClass("rune_sec_disable");
      $("#2-2 #2-sec_tier"+tier_number).addClass("rune_sec_disable");
      sec_rune_detect_obj.first = tier_number;
    }else if (type == 2) {
      $("#2-1 #1-sec_tier"+sec_rune_detect_obj.second).removeClass("rune_sec_disable");
      $("#2-1 #1-sec_tier"+tier_number).addClass("rune_sec_disable");
      sec_rune_detect_obj.second = tier_number;
    }
  }
  myApp.rune_click_to_select = function (id,type,section){
    // console.log("id is " +id +" type is " + type +" section "+section);

    // console.log("target location id is "+section+"-"+type);
    var rune_html_selected_rune = `<div class = "rune_html_seleted_rune rune_active_selected_rune_border rune_loading"><img onclick = "myApp.rune_redecide(${type},${section})" src = "../assets/runes_icon/${id}.png"></div>`;
    $("#"+section+"-"+type).html(rune_html_selected_rune);
    // console.log("the error section is "+ section);
    if (section == 1) {
      $(".primary_rune_container .rune_active_selected_rune_border").css(
        'border-color',
        "rgba("+rune_category_color[rune_detect.primary][0]+", "
        +rune_category_color[rune_detect.primary][1]+", "
        +rune_category_color[rune_detect.primary][2]+", 1)");
        myApp.save_build.rune_set.primary_rune[type+1] = id;

    }else if (section == 2) {
      // console.log(rune_detect.secondary);
      $(".secondary_rune_container .rune_active_selected_rune_border").css(
        'border-color',
        "rgba("+rune_category_color[rune_detect.secondary][0]+", "
        +rune_category_color[rune_detect.secondary][1]+", "
        +rune_category_color[rune_detect.secondary][2]+", 1)");
        myApp.save_build.rune_set.secondary_rune[type] = id;

    }


    var return_rune_info = rune_obtain_rune_info(id,section,type);
    // console.log(return_rune_info);
    // $("#"+section+"-"+type).html("<img src = '../assets/other/loader-transparent-85px.gif'>")
    $("#"+section+"-"+type).append(`<div class = "rune_html_selected_rune_info">
    <div class = "rune_html_selected_info_title">${return_rune_info[0]}</div>
    <div class = "rune_html_selected_info_detail">${return_rune_info[1]}</div>
    </div>`);
    if (section == 1) {
      $("#"+section+"-"+type+" .rune_html_selected_info_title").css('color',"rgba("+rune_category_color[rune_detect.primary][0]+", "+rune_category_color[rune_detect.primary][1]+", "+rune_category_color[rune_detect.primary][2]+", 1)");

    }
    else if (section ==2) {
      $("#"+section+"-"+type+" .rune_html_selected_info_title").css('color',"rgba("+rune_category_color[rune_detect.secondary][0]+", "+rune_category_color[rune_detect.secondary][1]+", "+rune_category_color[rune_detect.secondary][2]+", 1)");
    }
    // console.log(myApp.save_build.rune_set.primary_rune);
    // console.log(myApp.save_build.rune_set.secondary_rune);

    // console.log(JSON.stringify(myApp.save_build.rune_set.primary_rune));
    // $("#"+section+"-"+type).html('<img src = "../assets/runes_icon/1.png">');
  }
  function rune_obtain_rune_info (id,section,type) {
    if (section == 1) {
      switch (type) {
        case 0:
          console.log("type is 0 which is keystone");
          var output = rune_load_info("keystone",id);
          console.log(rune_load_info("keystone",id));
          return output;


          break;
        case 1:
          console.log("type is 1 which is tier1");
          var output = rune_load_info("tier1",id);
          console.log(output);
          return output;


          break;
        case 2:
          console.log("type is 2 which is tier2");
          var output = rune_load_info("tier2",id);
          console.log(output);
          return output;


          break;
        case 3:
          console.log("type is 3 which is tier3");
          var output = rune_load_info("tier3",id);
          console.log(output);
          return output;

          break;

      }

    }else {
      // console.log(sec_selected);
      $.each(sec_selected,function(key, value){
        console.log("id is " +id);
        console.log(key);
        console.log(value);
        value.forEach((e)=>{
          if (e.rune_id==id) {
            particular_rune_name = e.rune_name;
            particular_rune_description = e.description;
          }
        });
      });
      return [particular_rune_name,particular_rune_description];
    }

  }
  function rune_load_info (tier,id) {
    // console.log("I am clicking tier " + tier);
    // console.log(pri_selected[tier]);
    var particular_rune_name;
    var particular_rune_description;
    pri_selected[tier].forEach((e)=>{
      if (e.rune_id == id) {
        // console.log("I have found the id, which is " + e.rune_id);
        particular_rune_name = e.rune_name;
        particular_rune_description = e.description;
        // console.log(particular_rune_description);
      }
    });
    return [particular_rune_name,particular_rune_description];

  }
  myApp.rune_redecide = function(type,section){
    if (section == 1) {
      rune_expand_pri_selection(type,section);
    }
    else {
      rune_expand_sec_selection(type,section);

    }

  }

  function rune_expand_pri_selection(type,section){
    var rune_content = pri_selected[Object.keys(pri_selected)[type]];
    console.log(rune_content);
    var rune_html_expand_content = `<img src = "../assets/other/loader-transparent-85px.gif">`;
    for (var i = 0; i < rune_content.length; i++) {
      rune_html_expand_content = rune_html_expand_content + `
          <img onclick = "myApp.rune_click_to_select(${rune_content[i].rune_id},${type},${section})" class = "rune_html_expand_section" src = "../assets/runes_icon/${rune_content[i].rune_id}.png">
      `;
    }
    $("#1-"+type).html(rune_html_expand_content);
    $(".rune_html_expand_section").css('border-color',"rgba("+rune_category_color[rune_detect.primary][0]+", "+rune_category_color[rune_detect.primary][1]+", "+rune_category_color[rune_detect.primary][2]+", 0.8)");


    console.log(rune_detect.primary);

    console.log(rune_content); //returns 'someVal'
  }
  function rune_list_pri_rune (category){
    // console.log(myApp.runes[category]);
    myApp.runes[category].forEach((e)=>{
      switch (e.type) {
        case "keystone":
          pri_selected.keystone.push(e);

          break;
        case "tier1":
          pri_selected.tier1.push(e);

          break;
        case "tier2":
          pri_selected.tier2.push(e);

          break;
        case "tier3":
          pri_selected.tier3.push(e);

          break;
        default:

      }
    });
    console.log(pri_selected);
  }

  function rune_list_sec_rune (category){
    console.log(myApp.runes[category]);
    myApp.runes[category].forEach((e)=>{
      switch (e.type) {
        case "tier1":
          sec_selected.tier1.push(e);

          break;
        case "tier2":
          sec_selected.tier2.push(e);

          break;
        case "tier3":
          sec_selected.tier3.push(e);

          break;
        default:
      }
    });
    console.log(sec_selected);
  }
  myApp.rune_select_rune = function (category) {
    console.log("the category is " + category);
    if(!primary_flag){
      $("#rune_category_"+category).hide();
      $("#primary_rune_category").css('border-style',"solid");
      $("#primary_rune_category").css('border-width',"3px");

      $("#primary_rune_category").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", 0.3)");


      var image = `<img class = "rune_icon_category_selected" onclick = "myApp.rune_deselect('${category}')" src = '../assets/runes_icon/${category}.png'>`
      $("#primary_rune_category").html(image);
      $(".primary_rune_container .rune_selection").removeClass("rune_inactive");
      $(".primary_rune_container .rune_decision").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", 1)");

      primary_flag = true;
      rune_detect.primary = category;
      console.log(rune_detect);
      if (first_time_build_pri) {
        rune_list_pri_rune(category);
        primary_interval = setInterval(function(){ rune_blink_effect(category,true) }, 100);

      }
      first_time_build_pri = false;
      myApp.save_build.rune_set.primary_rune[0] = category;


    }else if (!secondary_flag) {
      $("#rune_category_"+category).hide();
      $("#secondary_rune_category").css('border-style',"solid");
      $("#secondary_rune_category").css('border-width',"3px");
      $("#secondary_rune_category").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", 0.3)");
      $(".secondary_rune_container .rune_decision").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", 1)");
      var image = `<img class = "rune_icon_category_selected" onclick = "myApp.rune_deselect('${category}')" src = '../assets/runes_icon/${category}.png'>`
      $("#secondary_rune_category").html(image);
      $(".secondary_rune_container .rune_selection").removeClass("rune_inactive");

      secondary_flag = true;
      rune_detect.secondary = category;
      if (first_time_build_sec) {
        rune_list_sec_rune(category);
        secondary_interval = setInterval(function(){ rune_blink_effect(category,false) }, 100);
      }
      first_time_build_sec = false;
      myApp.save_build.rune_set.secondary_rune[0] = category;


      // console.log(rune_detect);
    }
  }
  function rune_blink_effect(category,primary){
    // console.log("test blink effect");
    if (primary) {
      $("#primary_rune_category").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", "+rune_count+")");

    }else {
      $("#secondary_rune_category").css('border-color',"rgba("+rune_category_color[category][0]+", "+rune_category_color[category][1]+", "+rune_category_color[category][2]+", "+rune_count+")");
    }
    if (rune_count_flag) {
      rune_count = rune_count + 0.05
    }else {
      rune_count = rune_count - 0.05
    }
    if (rune_count > 1) {
      rune_count_flag = false;
    }else if (rune_count < 0.1) {
      rune_count_flag = true;
    }

  }
  myApp.rune_deselect = function (category){
    console.log("the category is " + category);
    $("#rune_category_"+category).show();
    if (rune_detect.primary == category) {
      $("#primary_rune_category").html('');
      // $(".primary_rune_container ").addClass("rune_inactive");
      // $("#primary_rune_category").css('border-style',"none");
      $("#primary_rune_category").css("border-color","rgba(255, 255, 255, 0.3)");
      $(".primary_rune_container .rune_selection").empty().html('<div class = "rune_loading rune_decision"></div>');

      $(".primary_rune_container .rune_selection").addClass("rune_inactive");
      myApp.rune_bind_ui("left");


      primary_flag = false;
      pri_selected = {
        keystone : [],
        tier1 :[],
        tier2 :[],
        tier3 :[],
      };
      myApp.save_build.rune_set.primary_rune=[];
      console.log(pri_selected);
      clearInterval(primary_interval);
      first_time_build_pri = true;
    }
    else{
      $(".secondary_rune_container .rune_sec_disable").removeClass("rune_sec_disable");
      $("#secondary_rune_category").html('');
      // $(".secondary_rune_container ").addClass("rune_inactive");
      // $("#secondary_rune_category").css('border-style',"none");
      $("#secondary_rune_category").css("border-color","rgba(255, 255, 255, 0.3)");

      $(".secondary_rune_container .rune_selection .rune_loading").remove();

      $(".secondary_rune_container .rune_selection").empty().html(`<div class = "rune_loading rune_sec_decision_field">
                                                            <div class = "rune_decision"></div>
                                                          </div>`);
      $(".secondary_rune_container .rune_selection").addClass("rune_inactive");
      myApp.rune_bind_ui("right");

      clearInterval(secondary_interval);
      myApp.save_build.rune_set.secondary_rune=[];
      first_time_build_sec = true;
      secondary_flag = false;
      sec_rune_detect_obj ={
        first:0,
        second:0
      };
      sec_selected = {
        tier1  :[],
        tier2 :[],
        tier3 :[],
      }
    }
  }
  return myApp;
}))
