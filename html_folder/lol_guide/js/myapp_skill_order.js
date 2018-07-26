(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  myApp.champion_decided_flag = false;
  var skill_check_list_obj = {
    q : {
      count : 5,
      record : []
    },
    w : {
      count : 5,
      record : []
    },
    e : {
      count : 5,
      record : []
    },
    r: {
      count : 3,
      record : []
    },
  };
  var normal_skill_point = 5;
  var ultimate_skill_poit = 3;
  var skill_selected_champion_data;
  var skill_note_string_count = 0;
  var skill_array_key = Object.keys(skill_check_list_obj);

  myApp.skill_order_champion = function (champion_id){
    console.log("I am the skill order, the champion id is",champion_id);
    skill_init();
    if (myApp.current_page == "skill") {
      console.log("the current page is ",myApp.current_page);
      myApp.skill_champion_decided_flag = true;
      myApp.skill_order_writing_frame();
    }
  }
  myApp.skill_order_writing_frame = function (){

    console.log("myApp.champion_decided_flag",myApp.champion_decided_flag);
    var skill_frame = `
                        <div class = "skill_containner">
                            <div class = "skill_info_checkbox">
                              <div class = "skill_count_title">Remaining skill point count down:</div>
                              <div class = "skill_count_display">
                                  <div class = "skill_count_name">Q</div>
                                  <div class = "skill_count_number" id = "q"></div>
                              </div>
                              <div class = "skill_count_display">
                                  <div class = "skill_count_name">W</div>
                                  <div class = "skill_count_number" id = "w"></div>
                              </div>
                              <div class = "skill_count_display">
                                  <div class = "skill_count_name">E</div>
                                  <div class = "skill_count_number" id = "e"></div>
                              </div>
                              <div class = "skill_count_display">
                                  <div class = "skill_count_name">R</div>
                                  <div class = "skill_count_number" id = "r"></div>
                              </div>
                            </div>
                            <div class = "skill_info_checkbox" id = "4">
                              <div class = "skill_icon"></div>
                              <div class ="skill_selection_holder">
                                <div class = "skill_name"></div>
                                <div class = "skill_check_list skill_passive_css">
                                  Passive
                                </div>
                              </div>
                            </div>
                            <div class = "skill_info_checkbox" id = "0">
                              <div class = "skill_icon"></div>
                              <div class ="skill_selection_holder">
                                <div class = "skill_name"></div>
                                <div class = "skill_check_list">
                                </div>
                              </div>
                            </div>
                            <div class = "skill_info_checkbox" id = "1">
                              <div class = "skill_icon"></div>
                              <div class ="skill_selection_holder">
                                <div class = "skill_name"></div>
                                <div class = "skill_check_list">
                                </div>
                              </div>
                            </div>
                            <div class = "skill_info_checkbox" id = "2">
                              <div class = "skill_icon"></div>
                              <div class ="skill_selection_holder">
                                <div class = "skill_name"></div>
                                <div class = "skill_check_list"></div>
                              </div>
                            </div>
                            <div class = "skill_info_checkbox" id = "3">
                              <div class = "skill_icon"></div>
                              <div class ="skill_selection_holder">
                                <div class = "skill_name"></div>
                                <div class = "skill_check_list"></div>
                              </div>
                            </div>
                            <div class = "skill_note_field">
                              <div>Note :</div>
                              <textarea class = "form-control skill_input_note" cols = "60" rows = "5"></textarea>
                            </div>
                            <div class = "skill_note_count note_count_css">${skill_note_string_count}/600</div>
                        </div>
    `;
    if (!myApp.skill_champion_decided_flag) {
      $("#pool_and_selection").html("<div class = 'skill_skin_warning'>Please pick a chamion first</div>");
    }else {
      console.log("chamion has been selected, it is ready to built the frame");
      $("#pool_and_selection").html(skill_frame);
      skill_build_checklist();
      skill_restore();
      skill_bind_ui();

      console.log(myApp.save_build.champion_id);
      for (var i = 0; i < myApp.champions.length; i++) {
        if (myApp.champions[i].champion_id == myApp.save_build.champion_id) {
          skill_selected_champion_data = myApp.champions[i].data;
          break;
        }
      }
      console.log(skill_selected_champion_data);
      for (var i = 0; i < skill_selected_champion_data.length; i++) {
        $("#"+i+" .skill_icon").html(`<img data-toggle='popover' src = "../assets/skill/${myApp.save_build.champion_id}/${i}.png">`);
        $("#"+i+" .skill_name").html(`${skill_selected_champion_data[i].name}`);
        skill_init_popover(skill_selected_champion_data[i],i);
      }

    }
  }
  function skill_init (){
    skill_check_list_obj = {
      q : {
        count : 5,
        record : []
      },
      w : {
        count : 5,
        record : []
      },
      e : {
        count : 5,
        record : []
      },
      r: {
        count : 3,
        record : []
      },
    };
    myApp.save_build.skill_order_table = {
      order_id : 0,
      order_list : ["","","","","","","","","","","","","","","","","",""],
      note : ""
    };

  }
  function skill_display_remian_point(){
    for (var i = 0; i < skill_array_key.length; i++) {
        $(`input[name =${skill_array_key[i]}]:checked`).each(function(){
          console.log("this.name ", this.name);
          console.log("this.value ", this.value);
          skill_check_list_obj[this.name].record.push(this.value);
          console.log("skill_check_list_obj[this.name].record", skill_check_list_obj[this.name].record);
        });
    }
    for (var i = 0; i < skill_array_key.length; i++) {
      if (skill_array_key[i] == 'r') {


        $("#"+skill_array_key[i]).html(ultimate_skill_poit-skill_check_list_obj[skill_array_key[i]].record.length);
        skill_check_list_obj[skill_array_key[i]].record = [];

      }else {


        $("#"+skill_array_key[i]).html(normal_skill_point-skill_check_list_obj[skill_array_key[i]].record.length);
        skill_check_list_obj[skill_array_key[i]].record = [];

      }
    }
  }
  function skill_restore(){
    // I will do restore save data here
    console.log(myApp.save_build.skill_order_table.order_list);
    for (var i = 0; i < myApp.save_build.skill_order_table.order_list.length; i++) {
      if(myApp.save_build.skill_order_table.order_list[i] === ""){
        continue;
      }else {
        $(`input[type="checkbox"][name="${myApp.save_build.skill_order_table.order_list[i]}"][value = ${i}]`).prop('checked',true);
        // skill_check_list_obj[myApp.save_build.skill_order_table.order_list[i]].count = skill_check_list_obj[myApp.save_build.skill_order_table.order_list[i]].count -1;
        console.log(myApp.save_build.skill_order_table.order_list[i]);
        console.log(skill_check_list_obj[myApp.save_build.skill_order_table.order_list[i]]);
        $("#"+myApp.save_build.skill_order_table.order_list[i]).html(skill_check_list_obj[myApp.save_build.skill_order_table.order_list[i]].count);
      }

    }
    skill_display_remian_point();

    //


  }
  function skill_build_checklist(){
    var temp_var = "";
    for (var i = 0; i < 4; i++) {
      switch (i) {
        case 0:
          temp_var = 'q';
          break;
        case 1:
          temp_var = 'w';
          break;
        case 2:
          temp_var = 'e';
          break;
        case 3:
          temp_var = 'r';
          break;
      }
        for (var j = 0; j < 18; j++) {
          // console.log("test, this is ",j);
          $("#"+i+" .skill_check_list").append(`<div class = "skill_div">
                                              <ul class = "skill_list_div">
                                                  <li>${j+1}</li>
                                                  <li><input class = "skill_check_box" type = "checkbox" name = "${temp_var}" value = "${j}"></li>
                                              </ul>
                                            </div>`);
        }

    }

  }
  // $('input[type="checkbox"][name="q"][value = 2]').prop('checked',false);
  function skill_bind_ui(){

    var temp_count = 0;
    // console.log("the name is ",this.name);
    var max_point = 5;
    $("input:checkbox").change(function() {
        if(this.checked) {
            // console.log(this);
            var temp_value = this.value;
            var temp_name = this.name;
            if (this.name == "r") {
              max_point = 3
            }else {
              max_point = 5;
            }

            for (var i = 0; i < myApp.save_build.skill_order_table.order_list.length; i++) {
                if (myApp.save_build.skill_order_table.order_list[i] == this.name) {
                  temp_count ++;
                }
            }
            if (temp_count != max_point ) {
              myApp.save_build.skill_order_table.order_list[this.value] = this.name;
              $(`input[type="checkbox"][value = ${this.value}]`).prop('checked',false);
              $(`input[type="checkbox"][name=${this.name}][value = ${this.value}]`).prop('checked',true);
              // $("#"+this.name).html(skill_check_list_obj[this.name].count);
              skill_display_remian_point();
            }else {
              $(`input[type="checkbox"][name=${this.name}][value = ${this.value}]`).prop('checked',false);
            }
        temp_count = 0;
        }else if (!this.checked) {
            console.log("this.name",this.name);
            console.log("this.value",this.value);
            myApp.save_build.skill_order_table.order_list[this.value] = "";
            skill_display_remian_point();


        }
    });
    $(".skill_input_note").keyup(function(){
      console.log("key in value is ",this);
      myApp.save_build.skill_order_table.note = $(".skill_input_note").val();
      skill_note_string_count = $(".skill_input_note").val().length;
      $(".skill_note_count").html(`${skill_note_string_count}/600`);
      // console.log(myApp.save_build.skill_order_table);
    });
  }
  function skill_init_popover (content_info,count){

    var content_frame = `<div class="media sspell_popover">
                              <div class = "sspell_popover_icon">
                                <img src = "../assets/skill/${myApp.save_build.champion_id}/${count}.png">
                              </div>
                              <div class="media-body sspell_popover_description">
                                  <h4 class="media-heading sspell_popover_name">${content_info.name}</h4>
                                  <div class = "sspell_popover_detail">${content_info.description}</div>
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
