(function(factory){
 window.myApp = factory({});
}

(function(myApp){

  var id = '';
  var pool_id = "pool_and_selection";
  var find_user = false;
  myApp.config = {
                  id : ""
  }
  myApp.current_page = "";
  myApp.item_set_number = 0;
  myApp.champions;
  myApp.spells;
  myApp.items;
  myApp.runes;
  myApp.exist_builds = [];
  myApp.save_build = {
                  build_id : 0,
                  user_id  : 1,
                  champion_id :1,
                  date_create : "",
                  update_time : "",
                  build_name : "",
                  skin_id : 0,
                  spell_set : {
                            spell_set_id : 0,
                            spell_id_1 : 0,
                            spell_id_2 : 0,
                            note : ""
                  },
                  rune_set : {
                      rune_set_id : 0,
                      primary_rune : ["",0,0,0,0],
                      secondary_rune : ["",0,0],
                      note : ""
                  },
                  item_set  :
                  [

                  ],
                  item_detail_set : [

                  ],
                  against_champion:[

                  ] ,
                  skill_order_table  : {
                    order_id : 0,
                    order_list : ["","","","","","","","","","","","","","","","","",""],
                    note : ""
                  },
                  // skill_order_link_to_note  : {
                  //           skill_order_id　: 0,
                  //           note_id : 0
                  // },
  };
  var json_to_db= "";
  var current_build_id = 0;
  var current_user_id = 0;





myApp.user_validation = function(all_users){
  var current_user = $("#user_name").val();
  console.log("all users info are");
  console.log(all_users);
  console.log("user in text field " + current_user);
  for (var i = 0; i < all_users.data.length; i++) {
    if (all_users.data[i].user_name == current_user) {
      find_user = true;
      myApp.save_build.user_id = all_users.data[i].user_id;
      break;
    }
  }
  if (find_user) {
      console.log("user match");
      console.log("current user id is " + myApp.save_build.user_id);
      $("#user_name").prop('disabled',true);
      $("#user_name").css("border-color","green");
      $(".header").append(`<button onclick='myApp.create_writing_frame("true")'>create</button>`);
      $(".header").append(`<button onclick='myApp.goTo("view_user_build")'>view your builds</button>`);

  }
  else {
    console.log("user not found");
      $("#user_name").css("border-color","red");
  }
}

myApp.read_initial_data = function(obj){
  console.log(obj.data);
  myApp.champions = obj.data.champions;
  // console.log(champions[0].champion_name);
  myApp.spells = obj.data.spells;
  myApp.items = obj.data.items;
  myApp.exist_builds = obj.data.builds;
  myApp.runes = obj.data.runes;
  if (window.location.hash == "") {
    console.log("hash tag is empty");
    myApp.load_exist_build();

  }else {
    console.log("hash tag is not empty");
    myApp.main_check_hash();
  }

  // console.log(myApp.champions);
  console.log(myApp.spells);
  // console.log(myApp.items);

  // console.log("I am the last sentense");
}
function build_frame() {
  var view = `
  <nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
     <div class="navbar-header">
       <a class="navbar-brand main_page_title" href="#" onclick="myApp_ajax.load()">Home</a>
     </div>
     <ul class="nav navbar-nav">
       <li class="dropdown">
         <a class = "main_page_create" href="#" onclick='myApp.create_writing_frame(true) '>Create</a>
       </li>
     </ul>
   </div>
  </nav>
  <div class="content">content</div>
  `;




  // <nav class="row navbar navbar-fixed-top main_nav_bar">
  //   <div class="col-md-4">
  //     <button onclick="myApp.load_exist_build()" >view all build</button>
  //   </div>
  //   <div class="col-md-4">
  //     <h>lol Guide</h>
  //   </div>
  //   <div class="col-md-4 user_profile">
  //       <button onclick="myApp.show_hide_user()" class="dropbtn user_profile">User</button>
  //       <div id="myDropdown" class="dropdown-content">
  //         <button onclick='myApp.create_writing_frame(true) ' class = "user_profile">create</button>
  //         <button onclick='myApp.load_users_build()'class = "user_profile">view your builds</button>
  //       </div>
  //   </div>
  // </nav>
  //


  $(id).html(view);
}
myApp.show_hide_user = function () {
  if ($("#myDropdown").is(":visible")) {
    $("#myDropdown").hide();
  }else {
    $("#myDropdown").show();
  }
}

function save_config (cfg){
  console.log("container id is "+cfg.id);
  id = "#" + cfg.id;
  myApp.config.id = "#" + cfg.id;
}

myApp.load_exist_build = function (){
  console.log("i am loading exist build");
  var view_buile_title = `
                          <div class = "main_logo_container">
                            <div class = "main_logo"><a href="https://clipartxtras.com/download/fde1093db25b44bd77d9fa7d9fb3d2222e106bbf.html"><img src = "../assets/other/poro-3.png"></a></div>
                            <div class = "main_page_logo_title"><span>Champion Guides</span></div>
                          </div>
                          <div class = "main_hint">
                              <h10>Click "Create" to start building your guide</h10>
                              <h10>Click builds below to view other people's guide</h10>
                          </div>
                          <div class = "row view_buile_title">
                            <div class = "col-md-3">Build Name</div>
                            <div class = "col-md-3">Champion</div>
                            <div class = "col-md-3 loarding_area"></div>
                            <div class = "col-md-3">Update time</div>

                          </div>
`
  $(id+' .content').html(view_buile_title);

  // var build_page = `<div class = "view_exist_build">
  //                   </div>`
  // $(id+' .content').html(build_page);
  for (var i = 0; i < myApp.exist_builds.length; i++) {
    var current_champion_name = "";
    var current_champion_id = 0;
    var build_set_frame = "";
    // console.log(myApp.exist_builds[i]);
    for (var j = 0; j < myApp.champions.length; j++) {
      // console.log(myApp.champions[j]);
      if (myApp.champions[j].champion_id == myApp.exist_builds[i].champion_id) {
        // console.log("champion name is " + myApp.champions[j].champion_name);
        current_champion_name = myApp.champions[j].champion_name;
        current_champion_id = myApp.champions[j].champion_id;

        break;
      }
    }
    var temp = JSON.stringify(myApp.exist_builds[i]);
    build_set_frame = `<div class = "row build_set_frame" onclick="myApp.display_view_guide(${myApp.exist_builds[i].build_id})">
                            <div  class ="grid grid-1 main_build_css main_build_name_css">`+ myApp.exist_builds[i].build_name +`</div>
                            <div  class ="grid grid-2 main_champion_icon_css"> <img src="../assets/champion_icon/`+current_champion_id+`.png" alt="`+current_champion_name+`"></div>
                            <div  class ="grid grid-3 main_build_css main_champion_name_css"> ${current_champion_name}</div>
                            <div  class ="grid grid-4 main_build_css"> `+ myApp.exist_builds[i].update_time +` </div>
                        </div>`;
    // console.log(build_set_frame);
    $(id+' .content').append(build_set_frame);
  }

}



myApp.load_users_build = function (){
  var current_champion_id = 0;
  var current_champion_name = "";

  var view_buile_title = `<div class = "row view_buile_title">
                            <div class = "col-md-3">Build Name</div>
                            <div class = "col-md-3">champion</div>
                            <div class = "col-md-3">update time</div>
                            <div class = "col-md-3">test</div>
                          <div>`
  $(id+' .content').html(view_buile_title);
  for (var i = 0; i < myApp.exist_builds.length; i++) {
    console.log("exist_builds[i].user_id is " +myApp.exist_builds[i].user_id);
    console.log("save_build.user_id is " +myApp.save_build.user_id);

    if (myApp.exist_builds[i].user_id != myApp.save_build.user_id) {
      continue;
    }
    var current_champion_name = "";
    var build_set_frame = "";
    // console.log(myApp.exist_builds[i]);
    for (var j = 0; j < myApp.champions.length; j++) {
      console.log(myApp.champions[j]);
      if (myApp.champions[j].champion_id == myApp.exist_builds[i].champion_id) {
        // console.log("champion name is " + myApp.champions[j].champion_name);
        current_champion_name = myApp.champions[j].champion_name;
        current_champion_id = myApp.champions[j].champion_id;

        break;
      }
    }
    var temp = JSON.stringify(myApp.exist_builds[i]);
    build_set_frame = `<div class = "row build_set_frame">
                            <div  class ="col-md-3">`+ myApp.exist_builds[i].build_name +`</div>
                            <div  class ="col-md-3"> <img src="../assets/champion_icon/`+current_champion_id+`.png" alt="`+current_champion_name+`"></div>
                            <div  class ="col-md-3"> `+ myApp.exist_builds[i].update_time +` </div>
                            <div  class ="col-md-3">
                            <button onclick="">view</button>
                            <button onclick='myApp.writing(`+temp+`)'>edit</button></div>
                        </div>`;
    console.log(build_set_frame);
    $(id+' .content').append(build_set_frame);
  }
}
myApp.writing = function (temp_build){
    console.log("edit , get stuff from db");
    myApp_ajax.get_build_details(temp_build.build_id);
    myApp.save_build.build_id = temp_build.build_id;
    myApp.save_build.user_id = temp_build.user_id;
    myApp.save_build.champion_id = temp_build.champion_id;
    myApp.save_build.date_create = temp_build.date_create;
    myApp.save_build.update_time = temp_build.update_time;
    myApp.save_build.skin_id = temp_build.skin_id;
    myApp.save_build.build_name = temp_build.build_name;
    console.log(myApp.save_build);
    myApp.create_writing_frame(false);
}
myApp.main_check_hash = function (){
  console.log("window.location.hash is ",window.location.hash);
  var build_id =  window.location.hash.substring(1);
  if (build_id != 0) {
    myApp.display_view_guide(build_id);
  }
}
myApp.load = function(cfg){
  save_config(cfg);
  build_frame();
  myApp_ajax.load();

  }
  return myApp;
}))
