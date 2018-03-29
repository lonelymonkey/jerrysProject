(function(factory){
 window.myApp = factory(window.myApp);
}
(function(myApp){
  var id = myApp.config.id;
  myApp.read_responser_after_save_build = function (response){
  console.log(response);

  myApp.save_build.build_id = response.data.build_id;
  console.log(myApp.save_build);
  }
  myApp.create_writing_frame = function (create){
    var writing_frame = ` <div class = "row create_main_function">
                              <div class = "col-md-3 ">
                                <button id = "save"onclick='myApp.send_build_to_ajax()'>save</button>
                              </div>
                              <div class = "col-md-6">
                                Build Name : <input type="text" id="build_name">
                              </div>
                              <div class = "col-md-3">
                                  <div id = "selected_champion">
                                    <button onclick = "myApp.create_select_champion()" class="create_select_champion btn btn-md" data-toggle="modal" data-target="#myModal">&#43;</button>
                                  </div>
                              </div>
                          </div>
                          <div class = "writing_field">
                            <div class = "field_selection">
                              <div class = "field_tag" onclick="myApp.select_field('spells')">Summoner Spell </div>
                              <div class = "field_tag" onclick="myApp.select_field('skill')">Ability order </div>
                              <div class = "field_tag" onclick="myApp.select_field('items')">Items </div>
                              <div class = "field_tag" onclick="myApp.select_field('runes')">Runes </div>
                              <div class = "field_tag" onclick="myApp.select_field('against_champion')">Against champion </div>
                              <div class = "field_tag" onclick="myApp.select_field('skin')"class = "field_tag" >Skin</div>
                            </div>
                            <div id ="pool_and_selection"></div>
                         </div>`;
     $(id + ' .content').html(writing_frame);
     if (!create) {
       if (myApp.save_build.champion_id!=0) {
         $("#pick_champion").val(myApp.save_build.champion_id);
       }
       if (myApp.save_build.build_name != "") {
         $("#build_name").val(myApp.save_build.build_name);
       }
     }else {
       init();
       $("#pick_champion").val(myApp.save_build.champion_id);
       $("#build_name").val(myApp.save_build.build_name);
     }

     $("#pick_champion").focusout(function(){
      myApp.save_build.champion_id  = $("#pick_champion").val();
      console.log("champion id is "+myApp.save_build.champion_id);
      });
      
      $("#build_name").focusout(function(){
       myApp.save_build.build_name  = $("#build_name").val();
       console.log("build name is "+myApp.save_build.build_name);
     });
  }
  myApp.send_build_to_ajax = function (){
    console.log(myApp.save_build);
    // create_dummy_build_for_testing_backend();
    console.log(myApp.save_build);
    var stringnify_build = JSON.stringify(myApp.save_build);
    myApp_ajax.save_build(stringnify_build);
  }
  /************Below is the test dummy build for backend*************/

  function create_dummy_build_for_testing_backend (){
    myApp.save_build = {
                    build_id : 20,
                    user_id  : 1,
                    champion_id :103,
                    date_create : "",
                    update_time : "",
                    build_name : "create to test backend",
                    skin_id : 0,
                    spell_set : {
                              spell_set_id : 9,
                              spell_id_1 : 11,
                              spell_id_2 : 12,
                              note_id : 1
                    },
                    item_set  : [
                      {
                        item_set_id : 65,
                        set_name : "65 mix test updateing detial update core item",
                        note_id : 0,
                        remove : true
                      },
                      {
                        item_set_id : 0,
                        set_name : "0 mix test create detial deffensive item",
                        note_id : 0,
                        remove : false
                      }
                    ],
                    item_detail_set : [
                      {
                      detail_id : 0,
                      item_set_id : 0,
                      items : [154,144,134]
                      },
                    ],
                    against_champion:[
                      {
                        against_id : 1,
                        champion_id : 7,
                        diffculty : 10,
                        note_id : 0,
                        remove : false

                      },
                      {
                        against_id : 2,
                        champion_id : 8,
                        diffculty : 10,
                        note_id : 0,
                        remove : false
                      },
                      {
                        against_id : 0,
                        champion_id : 516,
                        diffculty : 5,
                        note_id : 0,
                        remove : false
                      }
                    ] ,
                    skill_order_table  : [
                      {
                        order_id : 0,
                        skill_order_id : 0,
                        level          : 0,
                        skill          : "q"
                      }
                    ],
                    skill_order_link_to_note  : {
                              skill_order_id　: 0,
                              note_id : 0
                    },
                    note  : {
                              note_id : 0,
                              note    : ""
                    }
    };

  }











  /************aboveis the test dummy build for backend*************/

  myApp.select_field = function (field_name) {

    switch (field_name) {
      case "spells":
        myApp.sspell_build_writing_frame();

        break;
      case "skill":
        myApp.ability_build_writing_frame();
        break;
      case "items":
        myApp.items_build_writing_frame();
        break;
      default:
        $("#pool_and_selection").html(field_name);
    }
  }
  function init(){
    myApp.save_build.build_id=0;
    myApp.save_build.champion_id=103;
    myApp.save_build.build_name="";
  }
  myApp.creat_move_champion_to_selection = function (select_champion_id){
    console.log("champion select is "+select_champion_id);
    myApp.save_build.champion_id = select_champion_id;
    console.log(myApp.save_build);
    $("#selected_champion").html(`<img class="create_select_champion"
        data-toggle="modal" data-target="#myModal"
        onclick = "myApp.create_select_champion()"
        src="../assets/champion_icon/`+select_champion_id+`.png"
        alt="`+select_champion_id+`">`);
  }
  myApp.create_select_champion = function (selected_champion_id) {
    $("#create_champion_select_field").html("");
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
                  <input type="text" placeholder="Search ">
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
