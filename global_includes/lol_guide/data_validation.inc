<?php

class data_validation
{

  function __construct()
  {

  }
  public $item_set_count=0;
  public $item_detail_set_count=0;
  public static function special_set_validation($special_fk_name,$special_fk_value,$table_name,$phase_value){
    $db = new Database();
    $db->query('select * from '.$table_name.' where '.$special_fk_name.' =
                                :fk_value')
                        ->bind(':fk_value',$special_fk_value);
    $table_col_and_entry = $db->resultset();
    // echo "in special set validation \n";
    // var_dump($table_col_and_entry);
    $first_value = array_keys($table_col_and_entry[0]);
    $set_pri_key = $first_value[0];
    if ($table_col_and_entry[0][$set_pri_key] == $phase_value[$set_pri_key]) {
      return "update";
      // echo "detail_id match\n";
    }else {
      throw new Exception(5);
    }

  }
  public static function init_validation($data_to_db){
    // var_dump($data_to_db);
    $admi_ip = "127.0.0.1";
    $ipaddress = data_validation::get_ip_address();
    // data_validation::ip_address_validation($ipaddress);

    if ($ipaddress != $admi_ip) {
      data_validation::ip_address_validation($ipaddress);
    }

    data_validation::spell_validation($data_to_db["spell_set"]);
    data_validation::rune_validation($data_to_db["rune_set"]);
    $item_set_count = data_validation::item_set_validation($data_to_db["item_set"]);
    $item_detail_set_count = data_validation::item_detail_set_validation($data_to_db["item_detail_set"]);
    if ($item_detail_set_count != $item_set_count) {
      throw new Exception(1);
    }
  }
  public static function ip_address_validation ($ip){
    $db = new Database();
    $one_day = 86400;
    $today = strtotime("now");
    $db->query('SELECT date_create from build_guide where ip = :ip order by date_create desc limit 3')
       ->bind(":ip",$ip);
    $result_list = $db->resultset();
    if (sizeof($result_list)>=3) {
      $third_result = strtotime($result_list[2]["date_create"]);
      $time_diff = $third_result - $today;
      if ($time_diff<$one_day) {
        throw new Exception(7);
      }
    }
  }
  public static function get_ip_address(){
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if(isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if(isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'UNKNOWN';
    return $ipaddress;
  }
  public static function item_set_validation($data){
    $count = sizeof($data);
    for ($i=0; $i < $count; $i++) {
      if ($data[$i]["set_name"] == "") {
        throw new Exception(6);
      }
    }
    return $count;
  }
  public static function item_detail_set_validation($data){
    $count = sizeof($data);
    $item_count = 0;
    $db = new Database();
    $db->query('SELECT item_id from items');
    $temp_item_list = $db->resultset();
    $item_list = [];
    for ($i=0; $i < sizeof($temp_item_list) ; $i++) {
      array_push($item_list,$temp_item_list[$i]["item_id"]);
    }
    // var_dump($item_list);
    for ($i=0; $i < sizeof($data); $i++) {
      for ($j=0; $j < sizeof($data[$i]["items"]); $j++) {
        for ($k=0; $k <sizeof($item_list) ; $k++) {
          if ($data[$i]["items"][$j] == $item_list[$k]) {
            $item_count ++;
          }
        }
      }
      if ($item_count != sizeof($data[$i]["items"])) {
        throw new Exception(1);
      }
      $item_count = 0;
    }
    return $count;
  }
  private static function rune_validation($data){
    $db = new Database();
    $pri_count = 0;
    $sec_count = 0;

    if ($data["rune_set_id"] != 0) {
      // COMBAK: vaidation of set and build_id
    }
    if ($data["primary_rune"][0] == $data["secondary_rune"][0]) {
          throw new Exception(0);
    }
    $db->query('SELECT rune_id from runes where category = :category')
      ->bind(':category',$data["primary_rune"][0]);
    $primary_rune_list = $db->resultset();
    $db->query('SELECT rune_id from runes where category = :category')
      ->bind(':category',$data["secondary_rune"][0]);
    $secondary_rune_list = $db->resultset();
    for ($i=0; $i < sizeof($primary_rune_list); $i++) {
      for ($j=1; $j < sizeof($data["primary_rune"]); $j++) {
        if ($data["primary_rune"][$j] == $primary_rune_list[$i]["rune_id"]) {
          // var_dump($data["primary_rune"][$j]);
          // var_dump($primary_rune_list[$i]);
          $pri_count ++;
        }
      }
    }
    for ($i=0; $i < sizeof($secondary_rune_list); $i++) {
      for ($j=1; $j < sizeof($data["secondary_rune"]); $j++) {
        if ($data["secondary_rune"][$j] == $secondary_rune_list[$i]["rune_id"]) {
          // var_dump($data["primary_rune"][$j]);
          // var_dump($primary_rune_list[$i]);
          $sec_count ++;
        }
      }
    }
    if ($pri_count != 4 || $sec_count != 2) {
      throw new Exception(4);
    }

  }
  private static function spell_validation($data){
    $db = new Database();
    $db->query('SELECT spell_id from spell');
    $spell_list = $db->resultset();
    $spell_1 = false;
    $spell_2 = false;

    if ($data["spell_set_id"] != 0) {
      // COMBAK: vaidation of spell_set and build_id
    }
    // we validate spell_id 1 and 2
    if ($data["spell_id_1"] == $data["spell_id_2"] ) {
        throw new Exception(0);
    }
    for ($i=0; $i < sizeof($spell_list) ; $i++) {
      if ($data["spell_id_1"] == $spell_list[$i]["spell_id"]) {
        $spell_1 = true;
        break;
      }
    }
    for ($i=0; $i < sizeof($spell_list) ; $i++) {
      if ($data["spell_id_2"] == $spell_list[$i]["spell_id"]) {
        $spell_2 = true;
        break;
      }
    }
    if ($spell_1 != true || $spell_2 != true) {
      throw new Exception(3);
    }
  }
}

?>
