<?php

include '../../../global_includes/lol_guide/riot_api.inc';
include '../../../global_includes/lol_guide/config.inc';
include '../../../global_includes/lol_guide/import.inc';

include INCLUDE_PATH . '/JerryDatabase.class.inc';
echo "<pre>";
$api_key = "RGAPI-3d14a9ae-e545-4836-bcd4-0ae452f1d977";
$riotInterface = new riot_api_interface($api_key);
$json_to_db = new import_data_from_json();
// $riotInterface->update_data_from_riot();
// $json_to_db->import_champion_data();
$json_to_db->import_item_data();
// $json_to_db->import_spell_data();
// $spell_response = json_decode(file_get_contents("../spells.json"),true);
// var_dump($spell_response["data"]);
echo "done";
echo "</pre>";






/************remove the comments when it needs to be call*************/


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
?>
