<?php
include 'includes/riot_api.inc';
$api_key = "RGAPI-8ecf2a93-50a0-4fb0-83de-91eb3027abe4";
$riotInterface = new riot_api_interface($api_key);
/************remove the comments when it needs to be call*************/
$riotInterface->update_data_from_riot();

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

$items_response = file_get_contents("item.json");
$items_response = json_decode($items_response,true);

$champion_response = file_get_contents("champion.json");
$champion_response = json_decode($champion_response,true);
echo("<pre>");
var_dump($champion_response["data"]["Shyvana"]);
//var_dump($items_response);
echo("</pre>");
?>
