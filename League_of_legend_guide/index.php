<?php

include '../includes/riot_api.inc';
include '../includes/config.inc';
include '../includes/import.inc';

include INCLUDE_PATH . '/JerryDatabase.class.inc';

echo("<pre>");
$api_key = "RGAPI-8ecf2a93-50a0-4fb0-83de-91eb3027abe4";
$riotInterface = new riot_api_interface($api_key);
$json_to_db = new import_data_from_json();

$spell_response = json_decode(file_get_contents("spells.json"),true);
// var_dump($spell_response["data"]);

// $json_to_db->import_champion_data();
// $json_to_db->import_item_data();
// $json_to_db->import_spell_data();




/************remove the comments when it needs to be call*************/
//$riotInterface->update_data_from_riot();

/******************************************************/
/*
$items_response = file_get_contents("item.json");
$items_response = json_decode($items_response,true);
*/


/*

$database->query('INSERT INTO champions (champion_name, data) VALUES (:champion_name, :data)');
$database->bind(':champion_name', $name)->bind(':data',$data);
$database->execute();
*/
//var_dump($champion_response["data"]);
//var_dump($champion_spell_decode);
//var_dump($items_response);
echo("</pre>");
?>
<html>
  <head>
    <script
      src="https://code.jquery.com/jquery-3.3.1.js"
      integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
      crossorigin="anonymous">
    </script>
    <script src="includes/ajax.js"></script>
  </head>
  <body>
    <div id = "champions">
    </div>
    <div id = "items">
    </div>
    <select id = "spells_1">
    </select>
    <select id = "spells_2">
    </select>
    <button id = "save">save</button>
    <input id = "build_id" type="text" name="build_id" value="1">
  </body>
</html>

<script>
  var champion_data = "";
  var item_data = "";
  // const myApp = {
  //   writeData : function() {
  //     var data = {name : "Jerry",
  //                       age : 25};
  //     var json_data = JSON.stringify(data);
  //     $.ajax({
  //       method : 'POST',
  //       dataType : 'json',
  //       url : 'ajax/data.php',
  //       data : { function : 'saveData',
  //                data     : json_data},
  //       success : function(response) {
  //         console.log('we got our data back');
  //         //console.log(response);
  //         data = response.data;
  //         $("#hello").html(data);
  //       }
  //     });
  //   },
  //   doSomething : function(callback) {
  //     var data = 'i just did something';
  //     console.log('doSomething');
  //     callback(data);
  //   }
  // };
  // myApp.get_Champion();
  // myApp.get_items();
  $(document).ready(function(){
    myApp.load();
  });
</script>
