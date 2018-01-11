<?php
include 'includes/riot_api.inc';
$api_key = "RGAPI-b7a4014d-615b-4ad5-bb0a-347e659b611d";
$riotInterface = new riot_api_interface();
/************remove the comments when it needs to be call*************/
/*
$items_response = $riotInterface->call_items_api($api_key);
var_dump($items_response);

$champion_response = $riotInterface->call_champion_api($api_key);
var_dump($champion_response);

$runes_response = $riotInterface->call_runes_api($api_key);
var_dump($runes_response);

$spells_response = $riotInterface->call_spells_api($api_key);
var_dump($spells_response);

/******************************************************/
$items_response = file_get_contents("items.json");
$items_response = json_decode($items_response,true);

$champion_response = file_get_contents("champion.json");
$champion_response = json_decode($champion_response,true);
echo "<br>";
var_dump($champion_response["data"]["Jax"][""]);
echo "<br>";
$items_id = strval(3025);
//var_dump($items_response);
echo "<br>";

/*object(stdClass)#285 (139) { ["Jax"]=> object(stdClass)#284 (4) { ["id"]=> int(24) ["key"]=> string(3) "Jax" ["name"]=> string(3) "Jax" ["title"]=> string(19) "Grandmaster at Arms" } */
/*object(stdClass)#3 (280) { ["3082"]=> object(stdClass)#2 (4) { ["id"]=> int(3082) ["name"]=> string(13) "Warden's Mail" ["description"]=> string(162) "+40 Armor*/

?>
