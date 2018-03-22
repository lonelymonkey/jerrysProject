(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var first_spell_on = false;
  var second_spell_on = false
  myApp.sspell_build_writing_frame = function (){
    var pool_members = "";
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
                      </div>`;
    $("#pool_and_selection").html(spell_field);
    for (var i = 0; i < myApp.spells.length; i++) {
      var sspell = `<div class = "spell_list_sspell" id = "sspell`+myApp.spells[i].spell_id+`">
                      <img onclick = "myApp.sspell_pool_to_selection(`+myApp.spells[i].spell_id+`)"
                      src = "../assets/sspell_icon/`+myApp.spells[i].spell_id+`.png">
                    </div>`;
      $(".spell_pool").append(sspell);
    }
    console.log("test test test");
    console.log(myApp.save_build);
  }

  myApp.sspell_pool_to_selection = function (pool_member_id) {
    console.log("spell pool to selection spell id is " + pool_member_id);
    var spell_ready_to_push = `<div class ="sspell_be_pushed" onclick = "myApp.sspell_selection_back_to_pool(`+pool_member_id+`)">
                                  <img class = "spell_be_pushed`+pool_member_id+`" src = "../assets/sspell_icon/`+pool_member_id+`.png">
                               </div>
                              `;
    if (!first_spell_on) {
      $(".spell_span1").hide();
      $("#spell1_spot").append(spell_ready_to_push);
      $("#sspell"+pool_member_id).hide();
      $(".spell_be_pushed"+pool_member_id).prop('alt', 'first');
      myApp.save_build.spell_set.spell_id_1 = pool_member_id;
      first_spell_on = true;
    }else if (!second_spell_on) {
      $(".spell_span2").hide();
      $("#spell2_spot").append(spell_ready_to_push);
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
  }

  return myApp;
}))
