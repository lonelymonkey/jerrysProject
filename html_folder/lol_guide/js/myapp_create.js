(function(factory){
 window.myApp = factory(window.myApp);
}
(function(myApp){
  var id = myApp.config.id;
  myApp.create_flag = false;
  myApp.read_responser_after_save_build = function (response){
    console.log(response.data);
    // console.log(myApp.save_build);
    myApp.save_build = response.data;
    console.log(myApp.save_build.against_champion);
  }
  myApp.create_writing_frame = function (create){
    myApp.create_flag = create;

    var writing_frame = ` <div class = "row create_main_function">
                              <div class = "col-md-3 save_button">
                                <button id = "save" onclick='myApp.send_build_to_ajax()'>save</button>
                              </div>
                              <div class = "col-md-6 create_build_name ">
                                Build Name : <input class = "form-control create_build_name_input_area" type="text" id="build_name">
                              </div>
                              <div class = "col-md-3 create_select_champion_button">
                                  <div class = "create_select_champion_title_holder">Champion : </div>
                                  <div id = "selected_champion">
                                    <button onclick = "myApp.create_select_champion()" class="create_select_champion btn btn-md" data-toggle="modal" data-target="#myModal">&#43;</button>
                                  </div>
                              </div>
                          </div>
                          <div class = "create_error_display_section"></div>
                          <div class = "writing_field">
                            <div class = "field_selection">
                              <div id= "field_tag_spells" class = "field_tag" onclick="myApp.select_field('spells')">Summoner Spell </div>
                              <div id = "field_tag_skill" class = "field_tag" onclick="myApp.select_field('skill')">Ability order </div>
                              <div id = "field_tag_items"  class = "field_tag" onclick="myApp.select_field('items')">Items </div>
                              <div id = "field_tag_runes"  class = "field_tag" onclick="myApp.select_field('runes')">Runes </div>
                              <div id = "field_tag_against_champion"  class = "field_tag" onclick="myApp.select_field('against_champion')">Against champion </div>
                              <div id = "field_tag_skin"  class = "field_tag" onclick="myApp.select_field('skin')" >Skin</div>
                            </div>
                            <div id ="pool_and_selection">
                              <div class = "create_start_msg"></div>
                            </div>
                         </div>`;
     $(id + ' .content').html(writing_frame);
     // go to first page directly
     $(`#field_tag_spells`).addClass('create_tab_active');
     console.log("create flag",myApp.create_flag);
     if (!create) {
       if (myApp.save_build.champion_id!=0) {
         $("#pick_champion").val(myApp.save_build.champion_id);
       }
       if (myApp.save_build.build_name != "") {
         $("#build_name").val(myApp.save_build.build_name);
       }
       console.log("myApp.current_page",myApp.current_page);
       myApp.select_field(myApp.current_page);
     }else {
       init();
       $("#pick_champion").val(myApp.save_build.champion_id);
       $("#build_name").val(myApp.save_build.build_name);
       myApp.current_page = "spells";

       myApp.sspell_build_writing_frame();

     }

     $("#pick_champion").focusout(function(){
      myApp.save_build.champion_id  = $("#pick_champion").val();
      console.log("champion id is "+myApp.save_build.champion_id);
      });

      $("#build_name").focusout(function(){
       myApp.save_build.build_name  = $("#build_name").val();
       console.log("build name is "+myApp.save_build.build_name);
     });
     myApp.create_flag = false;
  }
  myApp.send_build_to_ajax = function (){
    // console.log(myApp.save_build);
    // create_dummy_build_for_testing_backend();
    // console.log(myApp.save_build);
    var stringnify_build = JSON.stringify(myApp.save_build);
    if (myApp.save_build.champion_id == 0 || myApp.save_build.build_name =="") {
      $(".create_error_display_section").css("display","block");
      $(".create_error_display_section").html('please check the build name or the champion');
    }else {
      $(".save_button").html(`<div class = "save_loading"><img src = "../assets/other/loader-transparent-85px.gif"></div>`)
      myApp_ajax.save_build(stringnify_build);
    }

  }
  /************Below is the test dummy build for backend*************/

  function create_dummy_build_for_testing_backend (){
    myApp.save_build = {
                    build_id : 0,
                    user_id  : 1,
                    champion_id :103,
                    date_create : "",
                    update_time : "",
                    build_name : "create to test backend",
                    skin_id : 0,
                    spell_set : {
                              spell_set_id : 0,
                              spell_id_1 : 11,
                              spell_id_2 : 12,
                              note : "2nd test update note table where note_id = 4"
                    },
                    item_set  : [
                      {
                        item_set_id : 0,
                        set_name : "100 mix test updateing detial update core item",
                        note : "update item_set note 2",
                        remove : false
                      },
                      {
                        item_set_id : 0,
                        set_name : "100 mix test create detial deffensive item",
                        note : "update item_set note 2 ",
                        remove : false
                      }
                    ],
                    item_detail_set : [
                      {
                        detail_id : 0,
                        item_set_id : 0,
                        items : []
                      },
                      {
                        detail_id : 0,
                        item_set_id : 0,
                        items : []
                      }
                    ],
                    against_champion:[
                      {
                        against_id : 0,
                        champion_id : 7,
                        diffculty : 10,
                        note : "test saving not for agaisnt champion 1",
                        remove : false

                      },
                      {
                        against_id : 0,
                        champion_id : 8,
                        diffculty : 10,
                        note : "test saving not for agaisnt champion 2",
                        remove : false
                      },
                      {
                        against_id : 0,
                        champion_id : 516,
                        diffculty : 5,
                        note : "test saving not for agaisnt champion 3",
                        remove : false
                      }
                    ] ,
                    rune_set : {
                      rune_set_id : 0,
                      primary_rune : [1,2,3],
                      secondary_rune : [4,5,6],
                      note : ""
                    },
                    skill_order_table  : {
                      order_id : 0,
                      order : ["q","w","e","q","q","r","q","w","q","w","r","e","w","w","e","r","e","e"],
                      note : ""
                    }

    };

  }


  /************aboveis the test dummy build for backend*************/

  myApp.select_field = function (field_name) {
    $(`.field_tag`).removeClass('create_tab_active');
    switch (field_name) {
      case "spells":
        myApp.current_page = "spells";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');
        myApp.sspell_build_writing_frame();

        break;
      case "items":
        myApp.current_page = "items";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');

        myApp.items_build_writing_frame();
        break;
      case "runes":
        myApp.current_page = "runes";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');

        myApp.runes_build_writing_frame();
        break;
      case "against_champion":
        myApp.current_page = "against_champion";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');

        myApp.vschampion_build_writing_frame();
        break;
      case "skill":
        myApp.current_page = "skill";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');

        myApp.skill_order_writing_frame();
        break;
      case "skin":
        myApp.current_page = "skin";
        $(`#field_tag_${field_name}`).addClass('create_tab_active');

        myApp.skin_writing_frame();
        break;
      default:
        $("#pool_and_selection").html(field_name);
    }
  }
  function init(){
    console.log(myApp.save_build);
    myApp.save_build.build_id=0;
    myApp.save_build.champion_id=0;
    myApp.save_build.skin_id=0;
    myApp.save_build.build_name="";
    myApp.save_build.spell_set = {
                            spell_set_id : 0,
                            spell_id_1 : 0,
                            spell_id_2 : 0,
                            note : ""
                  };
    myApp.save_build.skill_order_table = {
      order_id : 0,
      order_list : ["","","","","","","","","","","","","","","","","",""],
      note : ""
    };
    myApp.save_build.rune_set={
        rune_set_id : 0,
        primary_rune : ["",0,0,0,0],
        secondary_rune : ["",0,0],
        note : ""
    };
    myApp.save_build.item_set = [];
    myApp.save_build.item_detail_set = [];
    myApp.save_build.against_champion = [];
    myApp.skill_champion_decided_flag = false;
    myApp.item_reset();
    myApp.rune_reset();
  }
  myApp.creat_move_champion_to_selection = function (select_champion_id){
    console.log("champion select is "+select_champion_id);
    if (myApp.save_build.champion_id != 0 && select_champion_id != myApp.save_build.champion_id) {
      init();

      myApp.rune_clean = true;
      myApp.create_writing_frame(false);

    }


    console.log(myApp.save_build);
    $("#selected_champion").html(`<img class="create_select_champion"
        data-toggle="modal" data-target="#myModal"
        onclick = "myApp.create_select_champion()"
        src="../assets/champion_icon/`+select_champion_id+`.png"
        alt="`+select_champion_id+`">`);
    $(".create_select_champion").css("opacity",1);
    myApp.save_build.champion_id = select_champion_id;
    myApp.skill_champion_decided_flag = true;
    myApp.skill_order_champion(select_champion_id);
    myApp.skin_champion(select_champion_id);

  }
  myApp.create_select_champion = function () {
    // $("#create_champion_select_field").html("");
    // <div class = "selected champion field"></div>
    // <input type="text" placeholder="Search Champion..." name="champion"><br>

    var champion_select_view = `
    <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Select Champion</h4>
            </div>
            <div class="modal-body" >
                <div class = "search">
                    <div id="create_champion_select_field">
                    </div>
                </div>
            </div>
          </div>

        </div>
      </div>`;
      $("#modal_field").html(champion_select_view);
      for (var i = 0; i < myApp.champions.length; i++) {
        switch (myApp.champions[i].champion_id) {
          case "103":
            $("#create_champion_select_field").append
            (`<div class ="create_list_champion">
                <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
                 "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
                 alt="`+myApp.champions[i].champion_id+`">
              </div>`);
            break;
          case "268":
            $("#create_champion_select_field").append
            (`<div class ="create_list_champion">
                <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
                 "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
                 alt="`+myApp.champions[i].champion_id+`">
              </div>`);
            break;
          case "81":
          $("#create_champion_select_field").append
          (`<div class ="create_list_champion">
              <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
               "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
               alt="`+myApp.champions[i].champion_id+`">
            </div>`);
             break;
          case "102":
          $("#create_champion_select_field").append
          (`<div class ="create_list_champion">
              <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
               "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
               alt="`+myApp.champions[i].champion_id+`">
            </div>`);
            break;
          case "114":
          $("#create_champion_select_field").append
          (`<div class ="create_list_champion">
              <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
               "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
               alt="`+myApp.champions[i].champion_id+`">
            </div>`);
           break;
          case "143":
          $("#create_champion_select_field").append
          (`<div class ="create_list_champion">
              <img data-dismiss="modal" onclick ="myApp.creat_move_champion_to_selection(`+myApp.champions[i].champion_id+`)
               "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
               alt="`+myApp.champions[i].champion_id+`">
            </div>`);
            break;
          default:
            continue;
        }
      }
  }
  return myApp;
}))
