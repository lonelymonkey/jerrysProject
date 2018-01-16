<?php
include 'includes/riot_api.inc';
$api_key = "RGAPI-9251397b-6ca1-447a-8d6f-748d1dd131e2";
$riotInterface = new riot_api_interface($api_key);
/************remove the comments when it needs to be call*************/
/*
$items_response = $riotInterface->call_items_api();
echo("<pre>");
var_dump($items_response);


$champion_response = $riotInterface->call_champion_api();

var_dump($champion_response);

$runes_response = $riotInterface->call_runes_api();

var_dump($runes_response);

$spells_response = $riotInterface->call_spells_api();

var_dump($spells_response);
echo("</pre>");
/******************************************************/

$items_response = file_get_contents("items.json");
$items_response = json_decode($items_response,true);

$champion_response = file_get_contents("champion.json");
$champion_response = json_decode($champion_response,true);
echo("<pre>");
var_dump($champion_response["data"]["Jax"]);
//var_dump($items_response["data"]);
echo("</pre>");
/*

array(2) {
  [0]=>
  string(4) "1029"
  [1]=>
  string(4) "1029"
}
["into"]=>
array(3) {
  [0]=>
  string(4) "3110"
  [1]=>
  string(4) "3143"
  [2]=>
  string(4) "3075"

*/




/*object(stdClass)#285 (139) { ["Jax"]=> object(stdClass)#284 (4) { ["id"]=> int(24) ["key"]=> string(3) "Jax" ["name"]=> string(3) "Jax" ["title"]=> string(19) "Grandmaster at Arms" } */
/*object(stdClass)#3 (280) { ["3082"]=> object(stdClass)#2 (4) { ["id"]=> int(3082) ["name"]=> string(13) "Warden's Mail" ["description"]=> string(162) "+40 Armor*/

?>
