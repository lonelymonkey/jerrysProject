<?php


/**
 *change https://na1.api.riotgames.com/lol/static-data as variable

 */
class riot_api_interface {
  public $base_url = "https://na1.api.riotgames.com/lol/static-data/v3";
  public $api_key;
  public function __construct ($api_key){
    $this->api_key = $api_key;
  }
  public function store_json(){}
  public function call_items_api(){
    $riot_item_url = $this->base_url."/items?api_key=". $this->api_key . "&tags=all";
    $response = file_get_contents($riot_item_url);
    $fp = fopen('items.json', 'w');
    fwrite($fp,$response);
    fclose($fp);
    $response = json_decode($response,true);
    return $response;
  }

  public function call_champion_api(){
    $riot_champion_url = $this->base_url."/champions?api_key=".$this->api_key. "&tags=all";
    $response = file_get_contents($riot_champion_url);
    $fp = fopen('champion.json', 'w');
    fwrite($fp,$response);
    fclose($fp);
    $response = json_decode($response,true);
    return $response;

  }
  public function call_runes_api(){
    $riot_runes_url =  $this->base_url."/runes?api_key=".$this->api_key. "&tags=all";
    $response = file_get_contents($riot_runes_url);
    $fp = fopen('runes.json', 'w');
    fwrite($fp,$response);
    fclose($fp);
    $response = json_decode($response,true);
    return $response;
  }
  public function call_spells_api(){
    $riot_spells_url =  $this->base_url."/summoner-spells?api_key=".$this->api_key. "&tags=all";
    $response = file_get_contents($riot_spells_url);
    $fp = fopen('spells.json', 'w');
    fwrite($fp,$response);
    fclose($fp);
    $response = json_decode($response,true);
    return $response;
  }
}
?>
