(function(factory){
 window.myApp = factory({});
}
(function(myApp){
  var champion_name = [];
  var champion_data = [];
  var spell_name = [];
  var spell_data = [];
  var item_data = [];
  var data_to_db = {};
  var json_to_db= "";
  var current_build_id = 0;
  var current_user_id = 0;
function get_items(){
  // console.log("I am in ajax.js and champion");
  $.ajax({
    method : 'GET',
    dataType : 'json',
    url : '../ajax/data.php',
    data : { function : 'get_items' },
    success : function(response) {
      console.log('we got our _items back');
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        item_data[i] = response.data[i];
        // $("#items").append(item_data[i].item_name + "<br>");
        // item_data = item_data + JSON.stringify(response.data[i].item_name) + "<br>" ;
      }
      console.log(item_data[1]);
      // $("#items").html(item_data);
      list_items();
    }
  })
}

function get_Champion(){
  // console.log("I am in ajax.js and champion");
  $.ajax({
    method : 'GET',
    dataType : 'json',
    url : '../ajax/data.php',
    data : { function : 'get_Champion' },
    success : function(response) {
      console.log('we got our Champion back');
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        // champion_data = champion_data + JSON.stringify(response.data[i].champion_name) + "<br>" ;
        champion_name[i] = response.data[i].champion_name;

        champion_data[i] = JSON.parse(response.data[i].data);
        // $("#champions").append(champion_name[i]+ "<br>");
      }
      // console.log(champion_data[0].id);
      // console.log(champion_name[0]);
      list_champions();
    }
  })
}

function list_champions(){
    for (var i = 0; i < champion_name.length; i++) {
      $("#champions").append("<option value="+ champion_data[i].id + ">"+ champion_name[i] +"</option>");
      // console.log(champion_name[i]);
    }
}

function get_spells(){
  console.log("I am in get spells");
  $.ajax({
    method : 'GET',
    dataType : 'json',
    url : '../ajax/data.php',
    data : { function : 'get_spell' },
    success : function(response) {
      console.log('we got our spells back');
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        // spell_data = spell_data + JSON.stringify(response.data[i].spell_name) + "<br>" ;
        // console.log("not stringify");
        // console.log(response.data[i].spell_name);
        // console.log("stringify");
        // console.log(JSON.stringify(response.data[i].spell_name));
        spell_name[i] = response.data[i].spell_name;
        spell_data[i] = JSON.parse(response.data[i].spell_data);
        // console.log(spell_data[i].id);
        // spell_list = spell_list + "<p>"+ response.data[i].spell_name + "</p>";
      // $("#spells").append("<p>"+ response.data[i].spell_name + "</p>");
      }
        // console.log("not stringify");
        // console.log(response.data[1].spell_data);
        // var test_spell_data = JSON.parse(response.data[2].spell_data);
        // console.log("the spell id is " +test_spell_data.id);
        list_spells();
      // $("#spells").html(spell_list);
    }
  })


}

function list_spells(){
    console.log("list spell is working");
    for (var i = 0; i < spell_name.length; i++) {
      $("#spells_1").append("<option value="+ spell_data[i].id + ">"+ spell_name[i] +"</option>");
      $("#spells_2").append("<option value="+ spell_data[i].id + ">"+ spell_name[i] +"</option>");
    }
}

function list_items(){
  for (var i = 0; i < item_data.length; i++) {
    $("#items").append("<option value="+ item_data[i].item_id + ">"+ item_data[i].item_name +"</option>");
  }
}

function save_to_DB(){
  console.log("save button is loaded");
  $('#save').on('click', function(){
    data_to_db.build_guide = {};
    console.log("button is working");
    var spell_set;
    // var build_id = $( "#build_id" ).val();

    // spell_set = JSON.stringify(temp_set);

    data_to_db.build_guide.update_time = "update_time";
    data_to_db.build_guide.build_id = current_build_id;
    data_to_db.build_guide.user_id = current_user_id;
    spell_set = read_spell_set();
    data_to_db.spell_set = spell_set;
    // data_to_db.build_id = build_id;
    console.log("ready to save to db, the spell set is " + data_to_db);
    console.log(data_to_db);
    json_to_db = JSON.stringify(data_to_db);

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
    data_to_db = {};
  });

}

function read_spell_set(){
  var spell_1;
  var spell_2;
  var spell_set;
  spell_1 = $( "#spells_1" ).val();
  spell_2 = $( "#spells_2" ).val();
  console.log("The spell 1 select is " + spell_1);
  console.log("The spell 2 select is " + spell_2);
  // console.log("The build id is " + build_id);
  spell_set = {
            spell_id_1 : spell_1,
            spell_id_2 : spell_2,
            build_id          : current_build_id,
  }
  // console.log(spell_set.summernor_spell_1);
  // spell_set_json = JSON.stringify(spell_set);
  // console.log("The json string is "+ test_spell_set);
  // reverse_spell_set = JSON.parse(test_spell_set)
  // console.log("This should be matched spell 1");
  // console.log(reverse_spell_set);
  console.log("be ready to return "+ spell_set);
  return spell_set;
}

function create_new_build(){
  console.log("create function is loaded");
  $('#create').on('click', function(){
      console.log("create button is working");
      $("#champions").show();
      $("#go_to_writing_page").show();
      $('#create').hide();
      $('#view').hide();
      $("#build_name").show();

    //   $.ajax({
    //   method : 'POST',
    //   dataType : 'json',
    //   url : '../ajax/data.php',
    //   data : { function : 'save_data',
    //            data : json_to_db},
    //   success : function(response) {
    //     console.log("save data successfully, below is the response");
    //     console.log(response);
    //   }
    // })
  });
}

function go_to_writing_page(){
  console.log("go button is loaded");
  console.log("current date is " + Date());
  $('#go_to_writing_page').on('click', function(){
      $('.container').hide();
      $("#writing_field").show();
      var build_guide_from_user = {};
      var build_name = $("#build_name").val();
      var selected_champion_id = $( "#champions" ).val();

      build_guide_from_user.build_name = build_name;
      build_guide_from_user.champion_id = selected_champion_id;
      build_guide_from_user.user_id = current_user_id;
      build_guide_from_user.date_create = "create_time";

      // console.log("selected champions id is " + selected_champion_id);
      // console.log("build_name is " + build_name);


      // load save button here temperally, cuz save button is not created until the html content is created

      // $("#champions").show();
      // $("#go_to_writing_page").show();
      // $('#create').hide();
      data_to_db.build_guide = build_guide_from_user;
      // data_to_db.save_time = "create_time";
      json_to_db = JSON.stringify(data_to_db);
      $.ajax({
      method : 'POST',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'save_data',
               data : json_to_db},
      success : function(response) {
        console.log("save data successfully, below is the response");
        console.log(response);
        current_build_id = response.data;
      }
    })
    data_to_db = {};
  });

}
function log_in(){
  $("#log_in").on('click',function(){
    var current_user = $("#user_name").val();
    var list_of_user = [];
    var find_user = false;
    console.log("user name is " + current_user);
    $.ajax({
      method : 'GET',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'log_in' },
      success : function(response) {
        console.log('we got our user name back');
        console.log(response);
        list_of_user = response.data;
        for (var i = 0; i < list_of_user.length; i++) {
          console.log(list_of_user[i]);
          if (list_of_user[i].user_name == current_user) {
            find_user = true;
            current_user_id = list_of_user[i].user_id;
            break;
          }
        }
        if (!find_user) {
          console.log("user not found");
          $(".container").append("user not found");
        }else {
          $("#log_in").hide();
          $("#user_name").hide();
          $(".container").append("user : " + current_user);
          $("#create").prop('disabled', false);
        }
      }
    })

  });
}
function view_all_build(){
  $("#view").on('click',function(){
    $.ajax({
      method : 'GET',
      dataType : 'json',
      url : '../ajax/data.php',
      data : { function : 'view_all_build'},
      success : function(response) {
        console.log('we got all the build');
        console.log(response);
      }
    })
  });
}
function bindUI(){
  create_new_build();
  go_to_writing_page();
  save_to_DB();
  log_in();
  view_all_build();
}
myApp.load = function(){
    get_Champion();
    get_items();
    get_spells();
    bindUI();
  }
  return myApp;
}))
