(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  var local_set_count = 0;
  var champion_parent = 0;
  var removed_set_id_array = [];
  var largest_count = 0;
  var just_removed = false;
  myApp.vschampion_build_writing_frame = function (){
    local_set_count = 0;
    var champion_frame =
    `
      <div class = "vs_champion_field">
        <div>
            <div class = "vs_champion_title vs_champion_champion">Champion</div>
            <div class = "vs_champion_title vs_champion_difficulty">Treat Level</div>
            <div class = "vs_champion_title vs_champion_note">Note</div>
        </div>
        <div class = "vs_champion_detail_field"></div>
        <div class = "vs_champion_add">
            <button class = "vs_champion_add_set" onclick = "myApp.vs_champion_add_set()">Add</button>
        </div>
      </div>
    `;
    $("#pool_and_selection").html(champion_frame);
    vs_champion_restore_difficulty();

    if (myApp.create_flag) {
      largest_count = 0;
      removed_set_id_array = [];
    }
    console.log(largest_count);
  }

  function vs_champion_restore_difficulty(){
    for (var i = 0; i < myApp.save_build.against_champion.length; i++) {
      var vs_champion_set_frame = `
      <div class = "row vs_champion_set" id = "vs_champion_set-${local_set_count}">
          <div class = "col-md-2 vs_champion_set_champion">
            <button onclick = "myApp.vs_champion_select_champion(${local_set_count})" class="create_select_champion btn btn-md" data-toggle="modal" data-target="#myModal">&#43;</button>
          </div>
          <div class = "col-md-6 vs_champion_set_difficulty">
              <div class = "vs_champion_difficulty_frame" id = "vs_champion_frame">
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_0" id = "vs_champion_level-${local_set_count}-0"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_1" id = "vs_champion_level-${local_set_count}-1"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_2" id = "vs_champion_level-${local_set_count}-2"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_3" id = "vs_champion_level-${local_set_count}-3"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_4" id = "vs_champion_level-${local_set_count}-4"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_5" id = "vs_champion_level-${local_set_count}-5"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_6" id = "vs_champion_level-${local_set_count}-6"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_7" id = "vs_champion_level-${local_set_count}-7"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_8" id = "vs_champion_level-${local_set_count}-8"></div>
                  <div class = "vs_champion_level_common vs_champion_difficulty_level_9" id = "vs_champion_level-${local_set_count}-9"></div>
              </div>
          </div>
          <div class = "col-md-3 vs_champion_set_notes">
            <textarea class = "vs_input_note" rows = "3" cols = "20"></textarea>
          </div>
          <div class = "col-md-1 vs_champion_set_remove">
              <button class = "vs_set_remove_button" onclick = "myApp.vs_champion_remove_set(${local_set_count})">&#10008;</button>
          </div>
      </div>
      `;
      $(".vs_champion_detail_field").append(vs_champion_set_frame);

      $("#vs_champion_level-"+i+"-"+myApp.save_build.against_champion[i].diffculty).addClass("vs_champion_active");
      if (myApp.save_build.against_champion[i].champion_id !=0) {
        $("#vs_champion_set-"+i+" .vs_champion_set_champion").html(`<img class="vs_champion_select_champion"
            data-toggle="modal" data-target="#myModal"
            onclick = "myApp.vs_champion_select_champion(${i})"
            src="../assets/champion_icon/`+myApp.save_build.against_champion[i].champion_id+`.png"
            alt="`+myApp.save_build.against_champion[i].champion_id+`">`);
        $("#vs_champion_set-"+i+" .vs_champion_select_champion" ).css("opacity",1);
        // myApp.save_build.against_champion[champion_parent].champion_id = select_champion_id;
      }
      console.log(myApp.save_build.against_champion[i].note);
      $(`#vs_champion_set-${local_set_count} .vs_input_note`).val(myApp.save_build.against_champion[i].note);
      if (removed_set_id_array.length == 0) {
        local_set_count ++;
        largest_count = local_set_count;
      }

      bind_set_level_ui();
    }
  }
  myApp.vs_champion_remove_set = function (set_id){
    console.log(set_id);
    removed_set_id_array.push(set_id);
    console.log("length of myApp.save_build.against_champion is " + myApp.save_build.against_champion.length);
    for (var i = 0; i < myApp.save_build.against_champion.length; i++) {
      console.log(JSON.stringify(myApp.save_build.against_champion[i]));
      if (myApp.save_build.against_champion[i].set_location == set_id) {
        if (myApp.save_build.against_champion.length ==1) {
          myApp.save_build.against_champion[i].remove = true;
          myApp_ajax.save_build(JSON.stringify(myApp.save_build));
          // myApp.save_build.against_champion.pop();
        }
        else {
          myApp.save_build.against_champion[i].remove = true;
          // First, set the remove flag to true, and then call ajax and save it first,
          // Finally remove it from against_champion array
          myApp_ajax.save_build(JSON.stringify(myApp.save_build))
          // myApp.save_build.against_champion.splice(i,1);
        }
        break;
      }
    }
    $("#vs_champion_set-"+set_id).remove();
    console.log(myApp.save_build.against_champion);
  }

  myApp.vs_champion_add_set = function(){
    just_removed = false;
    console.log("length of removed_set_id_array is " + removed_set_id_array.length);
    console.log(removed_set_id_array);
    if (removed_set_id_array.length!=0) {
      local_set_count = removed_set_id_array[0];
      if (removed_set_id_array.length!=1) {
        removed_set_id_array.splice(0,1);
      }else {
        removed_set_id_array.splice(0);
        console.log("pop the last element of removed_set_id array");
        just_removed =true;
      }
    }else {
      console.log("the largest count = " +largest_count);
      local_set_count = largest_count;
    }
    var vs_champion_set_frame = `
    <div class = "row vs_champion_set" id = "vs_champion_set-${local_set_count}">
        <div class = "col-md-2 vs_champion_set_champion">
          <button onclick = "myApp.vs_champion_select_champion(${local_set_count})" class="create_select_champion btn btn-md" data-toggle="modal" data-target="#myModal">&#43;</button>
        </div>
        <div class = "col-md-6 vs_champion_set_difficulty">
            <div class = "vs_champion_difficulty_frame" id = "vs_champion_frame">
                <div class = "vs_champion_level_common vs_champion_difficulty_level_0" id = "vs_champion_level-${local_set_count}-0"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_1" id = "vs_champion_level-${local_set_count}-1"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_2" id = "vs_champion_level-${local_set_count}-2"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_3" id = "vs_champion_level-${local_set_count}-3"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_4" id = "vs_champion_level-${local_set_count}-4"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_5" id = "vs_champion_level-${local_set_count}-5"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_6" id = "vs_champion_level-${local_set_count}-6"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_7" id = "vs_champion_level-${local_set_count}-7"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_8" id = "vs_champion_level-${local_set_count}-8"></div>
                <div class = "vs_champion_level_common vs_champion_difficulty_level_9" id = "vs_champion_level-${local_set_count}-9"></div>
            </div>
        </div>
        <div class = "col-md-3 vs_champion_set_notes">
          <textarea class = "vs_input_note" rows = "3" cols = "20"></textarea>
        </div>
        <div class = "col-md-1 vs_champion_set_remove">
            <button class = "vs_set_remove_button" onclick = "myApp.vs_champion_remove_set(${local_set_count})">&#10008;</button>
        </div>
    </div>
    `;
    if (myApp.save_build.against_champion.length < 99) {
      $(".vs_champion_detail_field").append(vs_champion_set_frame);

      myApp.save_build.against_champion.push({
                            against_id : 0,
                            champion_id : 0,
                            diffculty : 0,
                            note : "",
                            remove : false,
                            set_location : local_set_count
                          });
    }


    myApp.save_build.against_champion = myApp.save_build.against_champion.sort(function (a, b) {
      return a.set_location > b.set_location ? 1 : -1;
      // return a.set_location - b.set_location;

    });
    if (removed_set_id_array.length == 0) {
      local_set_count ++;
      if (!just_removed) {
        largest_count = local_set_count;
      }
    }

    bind_set_level_ui();
  }
  function bind_set_level_ui() {
    $(".vs_input_note").keyup(function() {
      console.log($(this).parent().parent().attr("id"));
      var index = $(this).parent().parent().attr("id").slice(-1);
      var index2 = $(this).parent().parent().attr("id").slice(-2);
      console.log("index is ",index);
      console.log("index2 is ",index2);

      if (Number(index2)<=0) {
        myApp.save_build.against_champion[index].note = $(this).val();
      }else {
        myApp.save_build.against_champion[index2].note = $(this).val();

      }

      console.log(myApp.save_build.against_champion);
    });
    $(".vs_champion_level_common").on("click",function(){
      var parent_id = $(this).parent().parent().parent().attr("id");
      var child_id = $(this).attr("id");
      var parent_index_2;
      $("#"+parent_id+" .vs_champion_level_common").removeClass("vs_champion_active");
      $(this).addClass("vs_champion_active");
      console.log(parent_id);
      console.log(child_id);
      var parent_index = parent_id.slice(-1);
      parent_index_2 =  parent_id.slice(-2);
      parent_index_2 = Number(parent_index_2);
      var difficulty_index = Number(child_id.slice(-1));
      console.log("result of difficulty_index is ",difficulty_index);

      console.log("result of parent_index_2 is ",parent_index_2);
      if (parent_index_2 < 0) {
        myApp.save_build.against_champion[parent_index].diffculty = difficulty_index;
        console.log("champion_id = ",  myApp.save_build.against_champion[parent_index].champion_id);
        console.log("difficulty = ",  myApp.save_build.against_champion[parent_index].diffculty);
        console.log("set location = ",parent_index);
      }else {
        myApp.save_build.against_champion[parent_index_2].diffculty = difficulty_index;
        console.log("champion_id = ",  myApp.save_build.against_champion[parent_index_2].champion_id);
        console.log("difficulty = ",  myApp.save_build.against_champion[parent_index_2].diffculty);
        console.log("set location = ",parent_index_2);
      }
      for (var i = 0; i < myApp.save_build.against_champion.length; i++) {
        console.log(myApp.save_build.against_champion[i]);
      }


    });

  }
// above is basic frame and difficulty bind_set_level_ui

myApp.vs_champion_move_champion_to_selection = function (select_champion_id,index){
  console.log("champion select is "+select_champion_id);
  // myApp.save_build.champion_id = select_champion_id;
  // console.log(myApp.save_build);
  $("#vs_champion_set-"+champion_parent+" .vs_champion_set_champion").html(`<img class="vs_champion_select_champion"
      data-toggle="modal" data-target="#myModal"
      onclick = "myApp.vs_champion_select_champion(${index})"
      src="../assets/champion_icon/`+select_champion_id+`.png"
      alt="`+select_champion_id+`">`);
  $("#vs_champion_set-"+champion_parent+" .vs_champion_select_champion" ).css("opacity",1);
  myApp.save_build.against_champion[champion_parent].champion_id = select_champion_id;
}

myApp.vs_champion_select_champion = function (index) {
  // $("#create_champion_select_field").html("");
  // <div class = "selected champion field"></div>
  // <input type="text" placeholder="Search Champion..." name="champion"><br>
  // champion_parent = $(this).parent().attr("class");

  champion_parent = index;
  console.log(champion_parent);
  var champion_select_view = `
  <!-- Modal -->
    <div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content vs_champion_modal">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Select Champion</h4>
          </div>
          <div class="modal-body" >
              <div class = "search">
                  <input placeholder="Search champion">
                  <div id="create_champion_select_field">
                  </div>
              </div>
          </div>
        </div>

      </div>
    </div>`;
    $("#modal_field").html(champion_select_view);
    for (var i = 0; i < myApp.champions.length; i++) {
      $("#create_champion_select_field").append
      (`<div class ="create_list_champion">
          <img data-dismiss="modal" onclick ="myApp.vs_champion_move_champion_to_selection(${myApp.champions[i].champion_id},${champion_parent})
           "src="../assets/champion_icon/`+myApp.champions[i].champion_id+`.png"
           alt="`+myApp.champions[i].champion_id+`">
        </div>`);
    }

}
  return myApp;
}))
