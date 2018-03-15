(function(factory){
 window.myApp = factory({});
}

(function(myApp){

  var id = '';
  var pool_id = "pool_and_selection";
  var find_user = false;
  var champions;
  var spells;
  var items;
  var exist_builds = [];
  var save_build = {
                  build_id : 0,
                  user_id  : 0,
                  champion_id :1,
                  date_create : "",
                  update_time : "",
                  build_name : "",
                  skin_id : 0,
                  spell_set : {
                            spell_id_1 : 0,
                            spell_id_2 : 0,
                            note_id : 0
                  },
                  item_set  : {
                            set_name : "",
                            note_id : 0
                  },
                  item_detail_set : {
                            item_set_id : 0,
                            items : "",
                  },
                  against_champion  : {
                            champion_id : 0,
                            diffculty : 0,
                            note_id : 0
                  },
                  skill_order_table  : {
                            skill_order_id : 0,
                            level          : 0,
                            skill          : "q"
                  },
                  skill_order_link_to_note  : {
                            note_id : 0
                  },
                  note  : {
                            note_id : 0,
                            note    : ""
                  }
  };
  var json_to_db= "";
  var current_build_id = 0;
  var current_user_id = 0;

function init(){
  save_build.build_id=0;
  save_build.champion_id=1;
  save_build.build_name="";

}
function save_to_DB(){
  console.log("save button is loaded");
  $('#save').on('click', function(){
    console.log("button is working");
    console.log("the build id is " + save_build.build_id);
    // var build_id = $( "#build_id" ).val();

    // spell_set = JSON.stringify(temp_set);

    // save_build.build_guide.update_time = "update_time";
    // save_build.build_guide.build_id = current_build_id;
    // save_build.build_guide.user_id = current_user_id;
    // spell_set = read_spell_set();
    // save_build.spell_set = spell_set;
    // save_build.build_id = build_id;
    console.log("ready to save to db, the spell set is " + save_build);
    console.log(save_build);
    json_to_db = JSON.stringify(save_build);

    console.log("after stringify ready to save to db, the spell set is " + json_to_db);

    $.ajax({
      method : 'POST',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'save_data',
               data : json_to_db},
      success : function(response) {
        console.log("save data successfully, below is the response");
        console.log(response);
      }
    })
  });

}





myApp.user_validation = function(all_users){
  var current_user = $("#user_name").val();
  console.log("all users info are");
  console.log(all_users);
  console.log("user in text field " + current_user);
  for (var i = 0; i < all_users.data.length; i++) {
    if (all_users.data[i].user_name == current_user) {
      find_user = true;
      save_build.user_id = all_users.data[i].user_id;
      break;
    }
  }
  if (find_user) {
      console.log("user match");
      console.log("current user id is " + save_build.user_id);
      $("#user_name").prop('disabled',true);
      $("#user_name").css("border-color","green");
      $(".header").append(`<button onclick='myApp.writing("create")'>create</button>`);
      $(".header").append(`<button onclick='myApp.goTo("view_user_build")'>view your builds</button>`);

  }
  else {
    console.log("user not found");
      $("#user_name").css("border-color","red");
  }
}

myApp.read_initial_data = function(obj){
  console.log(obj.data);
  champions = obj.data.champions;
  // console.log(champions[0].champion_name);
  spells = obj.data.spells;
  items = obj.data.items;
  exist_builds = obj.data.builds;

  console.log(champions);
  console.log(spells);
  console.log(items);

  // console.log("I am the last sentense");
}
function build_frame() {
  var view = `
    <div class="header">
      <button onclick="myApp.goTo('home')">home</button>
      <button onclick="myApp.goTo('view_all_build')">view all build</button>
      <button onclick="myApp_ajax.log_in()">Log_in</button>
      <input id = "user_name" type="text">
    </div>
    <div class="content">content</div>
  `;
  $(id).html(view);
}
function save_config (cfg){
  console.log("container id is "+cfg.id);
  id = "#" + cfg.id
}
function load_exist_build(){
  $(id+' .content').html("");

  // var build_page = `<div class = "view_exist_build">
  //                   </div>`
  // $(id+' .content').html(build_page);
  for (var i = 0; i < exist_builds.length; i++) {
    var current_champion_name = "";
    var build_set_frame = "";
    console.log(exist_builds[i]);
    for (var j = 0; j < champions.length; j++) {
      console.log(champions[j]);
      if (champions[j].champion_id == exist_builds[i].champion_id) {
        console.log("champion name is " + champions[j].champion_name);
        current_champion_name = champions[j].champion_name;
        break;
      }
    }
    var temp = JSON.stringify(exist_builds[i]);
    build_set_frame = `<ul class="build_set">
                        <li>`+ exist_builds[i].build_name +`</li>
                        <li> `+ current_champion_name +`</li>
                        <li> `+ exist_builds[i].update_time +` </li>
                        <li> <button onclick="">view</button> </li>
                       </ul>`;
    // console.log(build_set_frame);
    $(id+' .content').append(build_set_frame);
  }

}

function load_users_build(){
  $(id+' .content').html("");
  for (var i = 0; i < exist_builds.length; i++) {
    console.log("exist_builds[i].user_id is " +exist_builds[i].user_id);
    console.log("save_build.user_id is " +save_build.user_id);

    if (exist_builds[i].user_id != save_build.user_id) {
      continue;
    }
    var current_champion_name = "";
    var build_set_frame = "";
    console.log(exist_builds[i]);
    for (var j = 0; j < champions.length; j++) {
      console.log(champions[j]);
      if (champions[j].champion_id == exist_builds[i].champion_id) {
        console.log("champion name is " + champions[j].champion_name);
        current_champion_name = champions[j].champion_name;
        break;
      }
    }
    var temp = JSON.stringify(exist_builds[i]);
    build_set_frame = `<ul class="build_set">
                        <li>`+ exist_builds[i].build_name +`</li>
                        <li> `+ current_champion_name +`</li>
                        <li> `+ exist_builds[i].update_time +` </li>
                        <li> <button onclick="">view</button> </li>
                        <li> <button onclick='myApp.writing(`+temp+`)'>edit</button> </li>
                       </ul>`;
    console.log(build_set_frame);
    $(id+' .content').append(build_set_frame);
  }
}

myApp.writing = function (temp_build){

  console.log("build id is ");
  console.log(temp_build);
  if (temp_build == "create") {
    console.log("create mode");
    init();
  }
  else {
    console.log("edit , get stuff from db");
    myApp_ajax.get_build_details(temp_build.build_id);
    save_build.build_id = temp_build.build_id;
    save_build.user_id = temp_build.user_id;
    save_build.champion_id = temp_build.champion_id;
    save_build.date_create = temp_build.date_create;
    save_build.update_time = temp_build.update_time;
    save_build.skin_id = temp_build.skin_id;
    save_build.build_name = temp_build.build_name;
    console.log(save_build);
  }
  myApp.goTo("writing_page");
}
myApp.goTo = function (page) {
  switch (page) {
    case "view_all_build":
      load_exist_build();
      break;
    case "writing_page":
      build_writing_frame();
      break;
    case 'view_user_build':
    // console.log("testing testwaweiruowqerui");
      load_users_build();
      break;
    default:
      break;

  }
myApp.spell_pool_to_selection = function (pool_member_name, pool_member_id) {
    console.log("pool to selection");
    console.log("member name is " + pool_member_name);
    console.log("member id is " +　pool_member_id);
    if ($(".selection1").val()=="" && $(".selection2").val()!=pool_member_name) {
      $(".selection1").val(pool_member_name);
      save_build.spell_set.spell_id_1 = pool_member_id;
      $("input[value="+pool_member_id+"]").hide();
      // ask wayne tmr
      // console.log(save_build.spell_set.spell_id_1);
    }else if ($(".selection2").val()=="" && $(".selection1").val()!=pool_member_name) {
      $(".selection2").val(pool_member_name);
      save_build.spell_set.spell_id_2 = pool_member_id;
    }
}
myApp.select_field = function (field_name) {
  var pool_members = "";
  switch (field_name) {

    case "spells":
      console.log("the length of spells is");
      console.log(spells);
      for (var i = 0; i < spells.length; i++) {
        pool_members = pool_members + `<button onclick='myApp.spell_pool_to_selection(`+`"`+ spells[i].spell_name+ `"`+`,`+ spells[i].spell_id +`)' values = `+ spells[i].spell_id +`>`+ spells[i].spell_name +`</button>`;
      }
      console.log(pool_members);
      var spell_field =`<div class="spell_field">
                          <div class ="selection">
                            <input class = "selection1" type="text">
                            <input class = "selection2" type="text">
                          </div>
                          <div class ="pool">
                          </div>
                        </div>`;
      $("#pool_and_selection").html(spell_field);
      $(".selection1, .selection2").prop('disabled',true);
      $(".pool").append(pool_members);
      break;
    default:
      $("#pool_and_selection").html(field_name);

  }
}

}

myApp.send_build_to_ajax = function (){
  console.log(save_build);
  var stringify_build = JSON.stringify(save_build);
  myApp_ajax.save_build(stringify_build);

}

function build_writing_frame (){
  var writing_frame = ` <button onclick='myApp.send_build_to_ajax()'>save</button>
                        <input type="text" id="build_name">
                        <select id="pick_champion"></select>
                        <div class = "writing_field">
                          <ul class = "field_selection">
                            <li> <button onclick="myApp.select_field('spells')">Summoner Spell</button> </li>
                            <li> <button onclick="myApp.select_field('skill')">Ability order</button> </li
                            <li> <button onclick="myApp.select_field('items')">Items</button> </li>
                            <li> <button onclick="myApp.select_field('runes')">Runes</button> </li>
                            <li> <button onclick="myApp.select_field('against_champion')">Against champion</button> </li>
                            <li> <button onclick="myApp.select_field('skin')">Skin</button> </li>
                          </ul>
                          <div id ="pool_and_selection"></div>
                       </div>`;
   $(id + ' .content').html(writing_frame);
   console.log(save_build.champion_id);
   console.log(save_build.build_name);
   for (var i = 0; i < champions.length; i++) {
     $("#pick_champion").append(`<option value = `+champions[i].champion_id+`>`+champions[i].champion_name+`</option>`);
   }
   if (save_build.build_id !=0) {
     if (save_build.champion_id!=0) {
       $("#pick_champion").val(save_build.champion_id);
     }
     if (save_build.build_name != "") {
       $("#build_name").val(save_build.build_name);
     }
   }
   $("#pick_champion").focusout(function(){
    save_build.champion_id  = $("#pick_champion").val();
    console.log("champion id is "+save_build.champion_id);
    });
    $("#build_name").focusout(function(){
     save_build.build_name  = $("#build_name").val();
     console.log("build name is "+save_build.build_name);

   });
}
myApp.load = function(cfg){
  save_config(cfg);
  build_frame();
  myApp_ajax.load();
  }
  return myApp;
}))
