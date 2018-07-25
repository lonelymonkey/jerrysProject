(function(factory){
 window.myApp = factory(window.myApp);
}

(function(myApp){
  myApp.champion_decided_flag = false;
  var skin = {
    102 : 6,
    103 : 9,
    81 : 11,
    114 : 6,
    143 : 5,
    268 : 5
  }
  myApp.skin_champion = function (champion_id){
    console.log("I am the skill order, the champion id is",champion_id);
    skin_init();
    if (myApp.current_page == "skin") {
      console.log("the current page is ",myApp.current_page);
      myApp.champion_decided_flag = true;
      myApp.skin_writing_frame();
    }
  }
  myApp.skin_writing_frame = function (){
        if (!myApp.skill_champion_decided_flag) {
          $("#pool_and_selection").html("<div class = 'skill_skin_warning'>Please pick a chamion first</div>");

        }else {
          console.log("I have pick chamion,",myApp.save_build.champion_id);
          $("#pool_and_selection").html("");
          for (var i = 0; i < skin[myApp.save_build.champion_id]; i++) {
            console.log(i);
            $("#pool_and_selection").append(`<div class = "skin_img_container"><img class = "skin_img" alt = ${i} src = "../assets/skin/${myApp.save_build.champion_id}/${i}.png"></div>`);
          }
          skin_bind_ui ();
        }
        $(`.skin_img_container:has(img[alt="${myApp.save_build.skin_id}"])`).css("border-color","green");
  }
  function skin_bind_ui (){
    $(".skin_img").click(function (){
      var select_id = $(this).attr("alt");
      console.log($(this).attr("alt"));
      $(".skin_img_container").css("border-color","white");
      $(this).parent().css("border-color","green");
      myApp.save_build.skin_id = select_id;
      console.log(myApp.save_build);
    });
  }
  function skin_init(){
    myApp.save_build.skin_id = 0;
  }
  return myApp;
}))
