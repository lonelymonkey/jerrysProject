<?php


/**
 *change https://na1.api.riotgames.com/lol/static-data as variable

 */
class riot_api_interface {
  public $base_url = "https://na1.api.riotgames.com/lol/static-data/v3";
  public $api_key;
  private $file_name;
  public $response;
  public function __construct ($api_key){
    $this->api_key = $api_key;
  }
  public function update_data_from_riot(){
    $this->call_items_api();
    $this->call_champion_api();
    $this->call_spells_api();
  }
  private function store_items_as_json(){
    //$name = $this->file_name;
    $fp = fopen($this->file_name, 'w');
    fwrite($fp,$this->response);
    fclose($fp);
  }

  private function call_items_api(){
    $riot_item_url = $this->base_url."/items?api_key=". $this->api_key . "&tags=from&tags=gold&tags=inStore&tags=tags";
    $this->response = file_get_contents($riot_item_url);
    $this->file_name = "item.json";
    $this->store_items_as_json();
    $this->response = json_decode($this->response,true);
    return $this->response;
  }

  private function call_champion_api(){
    $riot_champion_url = $this->base_url."/champions?api_key=".$this->api_key. "&tags=spells&tags=passive";
    $this->response = file_get_contents($riot_champion_url);
    $this->file_name = "champion.json";
    $this->store_items_as_json();
    $this->response = json_decode($this->response,true);
    //return $this->response;
  }
  /*
  public function call_runes_api(){
    $riot_runes_url =  $this->base_url."/runes?api_key=".$this->api_key. "&tags=all";
    $this->$response = file_get_contents($riot_runes_url);
    $fp = fopen('runes.json', 'w');
    fwrite($fp,$response);
    fclose($fp);
    $this->$response = json_decode($this->$response,true);
    return $this->$response;
  }
  */
  private function call_spells_api(){
    $riot_spells_url =  $this->base_url."/summoner-spells?api_key=".$this->api_key. "&tags=cooldown";
    $this->response = file_get_contents($riot_spells_url);
    $this->file_name = "spells.json";
    $this->store_items_as_json();
    $this->response = json_decode($this->response,true);
    //return $this->$response;
  }
}
?>
