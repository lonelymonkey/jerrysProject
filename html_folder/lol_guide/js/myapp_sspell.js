(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var first_spell_on = false;
  var second_spell_on = false;
  var spell_note_string_count = 0;
  myApp.sspell_build_writing_frame = function (){
    var pool_members = "";
    sspell_init();
    console.log("the length of spells is");
    console.log(myApp.spells);
    console.log(pool_members);
    var spell_field =`<div class="spell_field">
                        <div class ="spell_selection">
                          <div id = "spell1_spot" class = "selected_spell">
                            <span class = "spell_span1">
                              Summoner spell 1
                            </span>
                          </div>
                          <div id = "spell2_spot" class = "selected_spell">
                            <span class = "spell_span2">
                              Summoner spell 2
                            </span>
                          </div>
                        </div>
                        <div class ="spell_pool"></div>
                      </div>
                      <div class = "spell_note_field">
                        <div>Note : </div>

                        <textarea class = "form-control spell_input_note note_control" rows = "5" cols = "60"></textarea>
                      </div>
                      <div class = "spell_note_count note_count_css">${spell_note_string_count}/600</div>`;
    $("#pool_and_selection").html(spell_field);
    $('.note_count_css').html(`${$('.note_control').val().length}/600`);
    $(".spell_input_note").keyup(function(){
      console.log("key in value is ",$(".spell_input_note").val());
      spell_note_string_count = $(".spell_input_note").val().length;
      $('.spell_note_count').html(`${spell_note_string_count}/600`);
      myApp.save_build.spell_set.note = $(".spell_input_note").val();
    });
    for (var i = 0; i < myApp.spells.length; i++) {
      // var parse_spell_data = JSON.parse(myApp.spells[i].spell_data);
      var spell_data_bundle = {
                                id : myApp.spells[i].spell_id,
                                name : myApp.spells[i].spell_name,
                                description : myApp.spells[i].spell_data.description
      };
      var sspell = `<div data-toggle='popover' class = 'spell_list_sspell' id = 'sspell`+myApp.spells[i].spell_id+`'>
                      <img onclick = 'myApp.sspell_pool_to_selection(`+myApp.spells[i].spell_id+`)'
                      src = '../assets/sspell_icon/`+myApp.spells[i].spell_id+`.png'>
                    </div>`;

        // "<div data-toggle=`popover` class = `spell_list_sspell` id = `sspell"+myApp.spells[i].spell_id+"`><img onclick = `myApp.sspell_pool_to_selection("+spell_data_bundle+")`src = `../assets/sspell_icon/"+myApp.spells[i].spell_id+".png`></div>"
      $(".spell_pool").append(sspell);
      // console.log(spell_data_bundle);
      initiate_sspell_popover(spell_data_bundle);
    }
    sspell_reload();
    // console.log("test test test");
    // console.log(myApp.save_build);

  }
  function sspell_init(){
    first_spell_on = false;
    second_spell_on = false;
  }
  function sspell_reload(){
    if (myApp.save_build.spell_set.spell_id_1 != 0) {
      myApp.sspell_pool_to_selection(myApp.save_build.spell_set.spell_id_1);

    }
    if (myApp.save_build.spell_set.spell_id_2 != 0) {
      myApp.sspell_pool_to_selection(myApp.save_build.spell_set.spell_id_2);
    }
    $(".spell_input_note").val(myApp.save_build.spell_set.note);
    console.log("note area content",$('.note_control').val());
    console.log("note area length",$('.note_control').val().length);
  }
  myApp.sspell_pool_to_selection = function (pool_member_id) {
    console.log(pool_member_id);
    for (var i = 0; i < myApp.spells.length; i++) {
      if (myApp.spells[i].spell_id !=pool_member_id) {
        continue;
      }
      // var parse_spell_data = JSON.parse(myApp.spells[i].spell_data);
      var spell_data_bundle = {
                                id : myApp.spells[i].spell_id,
                                name : myApp.spells[i].spell_name,
                                description : myApp.spells[i].spell_data.description
      };
    }
    console.log(spell_data_bundle);
    var spell_ready_to_push = `<div data-toggle="popover" class ="sspell_be_pushed" onclick = "myApp.sspell_selection_back_to_pool(`+pool_member_id+`)">
                                  <img class = "spell_be_pushed`+pool_member_id+`" src = "../assets/sspell_icon/`+pool_member_id+`.png">
                               </div>
                              `;
    if (!first_spell_on) {
      $(".spell_span1").hide();
      $("#spell1_spot").append(spell_ready_to_push);
      initiate_sspell_popover(spell_data_bundle);
      $("#sspell"+pool_member_id).hide();
      $(".spell_be_pushed"+pool_member_id).prop('alt', 'first');
      myApp.save_build.spell_set.spell_id_1 = pool_member_id;
      first_spell_on = true;
    }else if (!second_spell_on) {
      $(".spell_span2").hide();
      $("#spell2_spot").append(spell_ready_to_push);
      initiate_sspell_popover(spell_data_bundle);
      $("#sspell"+pool_member_id).hide();
      $(".spell_be_pushed"+pool_member_id).prop('alt', 'second');
      myApp.save_build.spell_set.spell_id_2 = pool_member_id;
      second_spell_on = true;
    }
    console.log(myApp.save_build.spell_set);
  }
  myApp.sspell_selection_back_to_pool = function (pool_member_id){
    console.log("sspell_selection_back_to_pool spell id is " + pool_member_id);
    $("#sspell"+pool_member_id).show();
    var spell_spot = $(".spell_be_pushed"+pool_member_id).attr("alt");
    console.log(spell_spot);
    if (spell_spot == "first") {
      first_spell_on = false;
      $(".spell_span1").show();
      myApp.save_build.spell_set.spell_id_1 = 0;
    }
    else if (spell_spot == "second") {
      second_spell_on = false;
      $(".spell_span2").show();
      myApp.save_build.spell_set.spell_id_2 = 0;

    }
    $(".spell_be_pushed"+pool_member_id).remove();
    $(".popover.fade.bottom.in").remove();
  }
  initiate_sspell_popover = function (popover_content){
    // console.log(popover_content.description);
    var content_frame = `<div class="media sspell_popover">
                              <div class = "sspell_popover_icon">
                                <img src="../assets/sspell_icon/`+popover_content.id+`.png"class="media-object" alt="Sample Image">
                              </div>
                              <div class="media-body sspell_popover_description">
                                  <h4 class="media-heading sspell_popover_name">`+popover_content.name+`</h4>
                                  <div class = "sspell_popover_detail">`+popover_content.description+`</div>
                              </div>
                           </div>`;
    $('[data-toggle="popover"]').popover({
        placement : 'bottom',
        trigger : 'hover',
        html : true,
        content : content_frame
      });
  }
  return myApp;
}))
