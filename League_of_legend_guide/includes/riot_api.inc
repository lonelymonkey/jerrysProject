<?php


/**
 *
 */
class riot_api_interface {

  public function call_items_api($api_key){
  $riot_item_url = "https://na1.api.riotgames.com/lol/static-data/v3/items?api_key=". $api_key;
  $response = file_get_contents($riot_item_url);
  $fp = fopen('items.json', 'w');
  fwrite($fp,$response);
  fclose($fp);
  $response = json_decode($response);
  return $response;
  }

  public function call_champion_api($api_key){
  $riot_champion_url = "https://na1.api.riotgames.com/lol/static-data/v3/champions?api_key=". $api_key;
  $response = file_get_contents($riot_champion_url);
  $fp = fopen('champion.json', 'w');
  fwrite($fp,$response);
  fclose($fp);
  $response = json_decode($response);
  return $response;

  }
  public function call_runes_api($api_key){
  $riot_runes_url = "https://na1.api.riotgames.com/lol/static-data/v3/runes?api_key=". $api_key;
  $response = file_get_contents($riot_runes_url);
  $fp = fopen('runes.json', 'w');
  fwrite($fp,$response);
  fclose($fp);
  $response = json_decode($response);
  return $response;
  }
  public function call_spells_api($api_key){
  $riot_spells_url = "https://na1.api.riotgames.com/lol/static-data/v3/summoner-spells?api_key=". $api_key;
  $response = file_get_contents($riot_spells_url);
  $fp = fopen('spells.json', 'w');
  fwrite($fp,$response);
  fclose($fp);
  $response = json_decode($response);
  return $response;
  }
}
?>
