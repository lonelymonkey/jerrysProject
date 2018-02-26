<?php
class import_data_from_json
{
  private $database;
  private $champion_response;
  private $item_response;
  private $spell_response;
  function __construct()
  {
    $this->database = new Database();
  }
  public function import_champion_data(){
    $this->champion_response = file_get_contents("../champion.json");
    $this->champion_response = json_decode($this->champion_response,true);
    foreach ($this->champion_response["data"] as $champion_name => $champion_data) {
      $this->database->query('DELETE from champions where champion_id = :champion_id')
                      ->bind(':champion_id', $champion_data["id"])
                      ->execute();
      $this->database->query('INSERT INTO champions (champion_id, champion_name, data)
                          VALUES (:champion_id, :champion_name, :data)')
                      ->bind(':champion_name', $champion_name)
                      ->bind(':champion_id', $champion_data["id"])
                      ->bind(':data',json_encode($champion_data))
                      ->execute();
/*
      $this->database->query('select * from champions where champion_id = :champion_id')
                      ->bind(':champion_id', $champion_data["id"]);
      $champion_return_data = $this->database->resultset();

      echo $champion_data["id"] . "<br>";
      echo $champion_data["name"] . "<br>";
      var_dump(json_decode($champion_return_data[0]["data"],true));
*/
    }
  }
  public function import_item_data(){
    $this->item_response = file_get_contents("../item.json");
    $this->item_response = json_decode($this->item_response,true);
    //var_dump($this->item_response["data"]);
    foreach ($this->item_response["data"] as $item_id => $item_detail) {
      // echo($item_id. "<br>");
      if (!empty($item_detail["description"])) {
        $item_description = $item_detail["description"];
      }else {
        $item_description = "";
      }
      if (!empty($item_detail["from"])) {
        $item_from = $item_detail["from"];
      }else {
        $item_from = [];
      }
      if (!empty($item_detail["into"])) {
        $item_into = $item_detail["into"];
      }else {
        $item_into = [];
      }
      if (!empty($item_detail["tags"])) {
        $item_tags = $item_detail["tags"];
      }else {
        $item_tags = [];
      }
      $this->database->query('DELETE from items where item_id = :item_id')
                     ->bind(':item_id', $item_id)
                     ->execute();

      $this->database->query('INSERT INTO items (item_id, item_name, total_cost, base_cost,
                                                  sell_price, description, tags, _from_, _into_)
                                        VALUES (:item_id, :item_name, :total_cost, :base_cost,
                                              :sell_price, :description, :tags, :_from_, :_into_)')
                     ->bind(':item_id', $item_id)
                     ->bind(':item_name', $item_detail["name"])
                     ->bind(':total_cost',$item_detail["gold"]["total"])
                     ->bind(':base_cost',$item_detail["gold"]["base"])
                     ->bind(':sell_price',$item_detail["gold"]["sell"])
                     ->bind(':description',$item_description)
                     ->bind(':tags',json_encode($item_tags))
                     ->bind(':_from_',json_encode($item_from))
                     ->bind(':_into_',json_encode($item_into))
                     ->execute();
    }
  }
  public function import_spell_data(){
    $this->spell_response = file_get_contents("../spells.json");
    $this->spell_response = json_decode($this->spell_response,true);
    foreach ($this->spell_response["data"] as $spell_name => $spell_data) {

      $this->database->query('DELETE from spell where spell_id = :spell_id')
                     ->bind(':spell_id', $spell_data["id"])
                     ->execute();

      $this->database->query('INSERT INTO spell (spell_id, spell_name, spell_data)
                              VALUES (:spell_id, :spell_name, :spell_data)')
                     ->bind(':spell_id',$spell_data["id"])
                     ->bind(':spell_name',$spell_data["name"])
                     ->bind(':spell_data',json_encode($spell_data))
                     ->execute();
/*
      $this->database->query('SELECT * FROM spell where spell_id = :spell_id')
                     ->bind('spell_id',$spell_data["id"]);
      $spell_return_data = $this->database->resultset();
      var_dump($spell_return_data[0][]);
      var_dump(json_decode($spell_return_data[0]["spell_data"],true));
*/
    }

  }
  /*Runes data should be key in manually*/
  public function import_rune_data(){


  }

}
 ?>
