<?php
if (!class_exists('dataServiceRead')) {
include "db_helper.inc";

require_once "data_validation.inc";

  class dataServiceRead {
    private $database;
    private $champion_array_type_data;
    private $champion_spell;
    private $champion_passive;
    public $response = ["champions"=>[],
                        "items"=>[],
                        "spells"=>[],
                        "builds"=>[],
                        "runes"=>[]
                      ];
    public function __construct() {
      $this->database = new Database();
    }
    public function get_build_sets($build_id){
      // this part is for editing exsist build
      var_dump($build_id);
    }
    public function get_all_data_from_build($build_id){
      $list_regular_table = [
        'spell_set',
        'rune_set',
        'skill_order_table',
        'item_set',
        'against_champion',
        'build_guide',
        'note'
      ];
      $return_data_array =[];
      $temp_item_array = [];
      for ($i=0; $i < sizeof($list_regular_table); $i++) {
        $this->database->query('SELECT * from '.$list_regular_table[$i].' where build_id = :build_id')
                       ->bind(":build_id",$build_id);
        $temp_regualr_data = $this->database->resultset();
        if (sizeof($temp_regualr_data) == 1) {
          $return_data_array[$list_regular_table[$i]] = $temp_regualr_data[0];
          for ($j=0; $j < sizeof($return_data_array[$list_regular_table[$i]]) ; $j++) {
            unset($return_data_array[$list_regular_table[$i]]["build_id"]);
          }

        }else {
          $return_data_array[$list_regular_table[$i]] = $temp_regualr_data;
          for ($j=0; $j < sizeof($return_data_array[$list_regular_table[$i]]) ; $j++) {
            unset($return_data_array[$list_regular_table[$i]][$j]["build_id"]);
          }
        }
        if ($list_regular_table[$i] == "rune_set" ) {
          $return_data_array[$list_regular_table[$i]]["primary_rune"] = explode('-',$return_data_array[$list_regular_table[$i]]["primary_rune"]);
          $return_data_array[$list_regular_table[$i]]["secondary_rune"] = explode('-',$return_data_array[$list_regular_table[$i]]["secondary_rune"]);
          // $first_phase_value["primary_rune"] = explode('-',$first_phase_value["primary_rune"]);
          // $first_phase_value["secondary_rune"] = explode('-',$first_phase_value["secondary_rune"]);
        }
        if ($list_regular_table[$i] == "skill_order_table" ) {
          // var_dump($return_data_array[$list_regular_table[$i]]);
          $return_data_array[$list_regular_table[$i]]["order_list"] = explode('-',$return_data_array[$list_regular_table[$i]]["order_list"]);
          // $first_phase_value["primary_rune"] = explode('-',$first_phase_value["primary_rune"]);
          // $first_phase_value["secondary_rune"] = explode('-',$first_phase_value["secondary_rune"]);
        }
        // var_dump($return_data_array[$list_regular_table[$i]]);


        // unset($return_data_array[$list_regular_table[$i]["build_id"]);
      }
      $return_data_array["item_detail_set"] = [];
      $list_array_keys = array_keys($return_data_array["item_set"]);
      // var_dump($return_data_array["item_set"]);
      if (gettype($return_data_array["item_set"][$list_array_keys[0]]) !="array") {
        $this->database->query('SELECT * from item_detail_set where item_set_id =:item_set_id ')
                       ->bind(':item_set_id',$return_data_array["item_set"]["item_set_id"]);
        $temp_item_array = $this->database->resultset();
        // var_dump($temp_item_array[0]);

        array_push($return_data_array["item_detail_set"],$temp_item_array[0]);
        // var_dump($return_data_array["item_detail_set"]);
        $return_data_array["item_detail_set"][0]["items"] = json_decode($return_data_array["item_detail_set"][0]["items"]);

      }else {
        for ($i=0; $i < sizeof($return_data_array["item_set"]); $i++) {
          // var_dump($return_data_array["item_set"]);

          $this->database->query('SELECT * from item_detail_set where item_set_id =:item_set_id ')
                         ->bind(':item_set_id',$return_data_array["item_set"][$i]["item_set_id"]);
          $temp_item_array[$i] = $this->database->resultset();
          array_push($return_data_array["item_detail_set"],$temp_item_array[$i][0]);
      }
        for ($i=0; $i < sizeof($return_data_array["item_detail_set"]); $i++) {
          // var_dump($return_data_array["item_detail_set"][$i]);
          $return_data_array["item_detail_set"][$i]["items"] = json_decode($return_data_array["item_detail_set"][$i]["items"]);
      }
      }
      // var_dump($return_data_array["item_detail_set"]);

      // $return_data_array["item_detail_set"] = $temp_item_array;
      // var_dump($return_data_array);

      unset($return_data_array["build_guide"]["ip"]);
      unset($return_data_array["build_guide"]["date_create"]);
      // var_dump($return_data_array);
      // exit;
      return $return_data_array;
    }
    public function get_initial_data() {
        $orgainzed_spell_data = [];
        $this->database->query('select * from champions');
                        // ->bind(':champion_id', $champion_data["id"]);
        $champion_return_data = $this->database->resultset();
        // var_dump($champion_return_data);
        foreach (($champion_return_data) as $champion => $champion_detail) {
          // echo "the champion is " . $champion ."\n";
          foreach ($champion_detail as $category => $entry) {
            $champion_skill_set=[];
            $champion_qwer = [];
            $champion_p=[];
            switch ($category) {
              case 'data':
                  $champion_array_type_data = json_decode($champion_detail[$category]);
                  // it is an object , 6 attributes. they are

                  // {
                  //   ["id"]=> int
                  //   ["key"]=> string
                  //   ["name"]=> string
                  //   ["title"]=> string
                  //   ["spells"] => array(4)
                  //             [0]=>object(20)
                  //             [1]=>object(20)
                  //             [2]=>object(20)
                  //             [3]=>object(20)
                  //   ["passive"]=>object(4)
                  // }
                  //
                  //
                  //
                  // var_dump($champion_array_type_data);
                  $champion_spell = $champion_array_type_data->spells;
                  $champion_passive = $champion_array_type_data->passive;
                  // var_dump($this->champion_spell);
                  foreach ($champion_spell as $champion_spell_order => $spell_detail) {
                    // var_dump($spell_detail);
                    $champion_qwer["name"] = $spell_detail->name;
                    $champion_qwer["description"] = $spell_detail->description;
                    if (property_exists($spell_detail,"tooltip")) {
                      $champion_qwer["tooltip"] = $spell_detail->tooltip;

                    }else {
                      $champion_qwer["tooltip"] = [];
                    }

                    array_push($champion_skill_set,$champion_qwer);
                    // var_dump($spell_detail);
                  }
                  // var_dump($champion_skill_set);
                  // array_push($champion_detail[$category], $champion_qwerp);
                  $champion_detail[$category] = $champion_skill_set;

                  // var_dump($champion_passive);
                  $champion_p["name"] = $champion_passive->name;
                  $champion_p["description"] = $champion_passive->description;
                    // $champion_p["name"] = $passive_description->name;
                    // $champion_p["description"] = $passive_description->description;

                  array_push($champion_detail[$category],$champion_p);
                  break;
              default :
                  break;
            }
          }
          array_push($this->response["champions"],$champion_detail);
        }
        // var_dump($this->response["champions"]);
        $this->database->query('select * from items');
                        // ->bind(':champion_id', $champion_data["id"]);
        $items_return_data = $this->database->resultset();
        // echo "<pre>";
        // var_dump($items_return_data);
        foreach ($items_return_data as $set=> $set_data) {
          foreach ($set_data as $row => $entry) {
            if ($row == ("tags") || $row == ("_from_") || $row == ("_into_")) {
              $set_data[$row] = json_decode($entry);
            }
          }
          $items_return_data[$set] = $set_data;
        }
        // echo "</pre>";



        $this->response["items"] = $items_return_data;

        $this->database->query('select * from spell');
                        // ->bind(':champion_id', $champion_data["id"]);
        $spell_return_data = $this->database->resultset();
        // var_dump($spell_return_data);
        foreach ($spell_return_data as $set=> $set_data) {
          foreach ($set_data as $row => $entry) {
            if ($row == ("spell_data")) {
              $set_data[$row] = json_decode($entry);
            }
          }
          $spell_return_data[$set] = $set_data;
        }

        foreach ($spell_return_data as $summon_spell => $data) {
          if ($data["spell_id"] > 0 && $data["spell_id"] < 22) {
            array_push($orgainzed_spell_data,$data);

            // echo $data["spell_name"]. "\n";
          }
        }
        // var_dump($spell_return_data);
        $this->response["spells"] = $orgainzed_spell_data;

        $this->response["builds"] = $this->load_all_build_and_its_data();
        // var_dump($this->response);
        $rune_category = ["precision","domination","sorcery","resolve","inspiration"];
        for ($i=0; $i < sizeof($rune_category); $i++) {
          $this->database->query('SELECT * from runes where category = :category')
                         ->bind(":category",$rune_category[$i]);
          $runes_return_data = $this->database->resultset();
          for ($j=0; $j <sizeof($runes_return_data); $j++) {
            unset($runes_return_data[$j]["category"]);
          }
          $this->response["runes"][$rune_category[$i]] = $runes_return_data;
        }

        // echo "<pre>";

        // var_dump($runes_return_data);

        // echo "</pre>";

        // echo $champion_data["id"] . "<br>";
        // echo $champion_data["name"] . "<br>";
        // var_dump(json_decode($champion_return_data[0]["data"],true));
        // var_dump($champion_return_data);
        // $this->response = $champion_return_data;
        return $this->response;
      // return "get champion complete";
    }

    // public function get_Champion() {
    //     $this->database->query('select * from champions');
    //                     // ->bind(':champion_id', $champion_data["id"]);
    //     $champion_return_data = $this->database->resultset();
    //
    //     // echo $champion_data["id"] . "<br>";
    //     // echo $champion_data["name"] . "<br>";
    //     // var_dump(json_decode($champion_return_data[0]["data"],true));
    //     // var_dump($champion_return_data);
    //     $this->response = $champion_return_data;
    //     return $this->response;
    //   // return "get champion complete";
    // }
    // public function get_items ($data ) {
    //   $this->database->query('select * from items');
    //                   // ->bind(':champion_id', $champion_data["id"]);
    //   $items_return_data = $this->database->resultset();
    //
    //   // echo $champion_data["id"] . "<br>";
    //   // echo $champion_data["name"] . "<br>";
    //   // var_dump(json_decode($champion_return_data[0]["data"],true));
    //   // var_dump($champion_return_data);
    //   $this->response = $champion_return_data;
    //   return $this->response;
    // }
    // public function get_spell ($data ) {
    //   $this->database->query('select * from spell');
    //                   // ->bind(':champion_id', $champion_data["id"]);
    //   $spell_return_data = $this->database->resultset();
    //
    //   // echo $champion_data["id"] . "<br>";
    //   // echo $champion_data["name"] . "<br>";
    //   // var_dump(json_decode($champion_return_data[0]["data"],true));
    //   // var_dump($champion_return_data);
    //   $this->response = $champion_return_data;
    //   return $this->response;
    // }
    public function log_in() {
      $this->database->query('select * from user');
      $retur_user_name = $this->database->resultset();
      $this->response = $retur_user_name;
      return $this->response;
    }
    private function load_all_build_and_its_data(){
      $this->database->query('select build_id, champion_id, skin_id, update_time,build_name from build_guide order by update_time DESC');

      $build_return_data = $this->database->resultset();

      return $build_return_data;
    }
    public function view_user_build(){
      $this->database->query('select *, user.user_name
                              from build_guide
                              inner join user on build_guide.user_id=user.user_id
                              order by update_time desc');
     $return_all_build = $this->database->resultset();
     $this->response = $return_all_build;
     return $this->response;
    }
  }
  class dataServiceWrite {
    private $set_pri_key;
    public  $data_to_db;
    private $database;
    private $db_validation;
    private $current_build_id = 0;
    private $set_validation;
    private $create_response_array = [];
    private $array_return_to_front_end = [];
    private $build_create_flag = false;
    private $build_for_creation = ["champion_id"=>0,
                                    "user_id"=>0,
                                    "date_create"=>"",
                                    "build_name"=>"",
                                    "skin_id"=>0,
                                    "update_time"=>""];
    public function __construct() {
      $this->database = new db_helper();
      $this->db_validation = new Database();
    }
    // private function update_or_create($table_name){
    //   echo "checking update or create \n";
    //
    // }
    private function user_validation($build_id,$user_id){

      $this->db_validation->query('select build_id from build_guide where user_id =
                                  :user_id')
                          ->bind(':user_id',$user_id);
      $all_build_id = $this->db_validation->resultset();
      // var_dump($all_build_id);
      foreach ($all_build_id as $build => $build_id) {
        if ($build_id == $build_id) {
          return true;
        }
      }
      return false;
    }
    private function set_validation($build_id,$table_name,$phase_value){
        // we select everything from table by build_id, if the return data is empty, it means we should create a entry

        $this->db_validation->query('select * from '.$table_name.' where build_id =
                                    :build_id')
                            ->bind(':build_id',$build_id);
        $table_col_and_entry = $this->db_validation->resultset();
        // var_dump($table_col_and_entry);
        if ($table_col_and_entry == NULL) {
          // echo "\n table_col_and_entry empty \n";
          $this->set_validation = "create";
        }else {
          // if the data want to store have value 0 on primary key, we should create;

          $first_value = array_keys($table_col_and_entry[0]);
          $this->set_pri_key = $first_value[0];
          if ($phase_value[$this->set_pri_key]==0) {
            // var_dump($phase_value);
            $this->set_validation = "create";
          }
          // code below is about update validation. if the FK matches and PK matches, we update
          $this->db_validation->query('select '.$this->set_pri_key.' from '.$table_name.' where build_id =
                                      :build_id')
                              ->bind(':build_id',$build_id);
          $all_set = $this->db_validation->resultset();
          // var_dump($phase_value[$this->set_pri_key]);
          // var_dump($all_set);
          foreach ($all_set as $set => $set_pk) {
            foreach ($set_pk as $set_key => $set_value) {
              if ($set_value == $phase_value[$this->set_pri_key]) {
                  $this->set_validation ="update";
              }
            }
          }
        }
    }
    private function build_guide_insert_or_update ($input_array){
      if ($input_array["build_id"]==0) {
        $input_array["build_name"] = htmlentities($input_array["build_name"]);
        $this->current_build_id = $this->database->insert($input_array,"build_guide");
        // $this->create_response_array["build_id"]=$this->current_build_id;
        $this->build_create_flag = true;
        return $this->current_build_id;
      }else {

          $temp_build_id = $input_array["build_id"];
          $this->current_build_id = $input_array["build_id"];
          unset($input_array["build_id"]);
          unset($input_array["date_create"]);
          // var_dump($input_array);
          // echo "build id is " . $temp_build_id ."\n";
          $input_array["build_name"] = htmlentities($input_array["build_name"]);

          $this->database->update($input_array,"build_guide","build_id = ".$temp_build_id);
      }
    }
    // $this->db_validation->query('DELETE FROM '.$first_phase_key.' where '.$this->set_pri_key.' = :pk_value')
    //                     ->bind(':pk_value', $data_set_col_entry[$this->set_pri_key])
    //                     ->execute();


    private function insert_note($note,$build_id){
      $encode_note = htmlentities($note);
      $this->db_validation->query('INSERT into note (note, build_id) values (:note, :build_id)')
                                     ->bind(":note",$encode_note)
                                     ->bind(":build_id",$build_id)
                                     ->execute();
      $note_id = $this->db_validation->lastInsertId();
      return $note_id;
    }
    private function update_note($note,$note_id){
      $encode_note = htmlentities($note);

      $this->db_validation->query('UPDATE note set note = :note where note_id = :note_id')
                          ->bind(":note",$encode_note)
                          ->bind(":note_id",$note_id)
                          ->execute();
    }
    private function get_ip(){
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
    public function save_data($data_to_db) {
      $deal_table_build_guide = false;
      $multiple_entry = true;
      $temp_pk;
      $fk_for_item_detail = [];
      $particular_fk;
      $forloop_count=0;
      $build_guide_array = ["build_id"=>0,
                            "user_id"=>0,
                            "champion_id"=>0,
                            "date_create"=>"",
                            "update_time"=>"",
                            "build_name"=>"",
                            "skin_id"=>0,
                            "ip"=>""];
      // echo "<pre>";
      // var_dump($data_to_db);
      //if $first_phase_value is array, which is dealing table
      //if $first_phase_value is not array, they are col and entry of build_guide
      $validation = new data_validation();
      $validation::init_validation($data_to_db);
      foreach ($data_to_db as $first_phase_key => $first_phase_value) {
        $multiple_entry = true;
        // var_dump($data_to_db);
        // array type stuff are belong to set tables, others are build_info
        if (gettype($first_phase_value) !="array") {
          foreach ($build_guide_array as $col => $entry){
            if ($col == $first_phase_key) {
              if ($first_phase_key == "update_time" || $first_phase_key == "date_create") {
                $build_guide_array[$col] = date("Y-m-d G:i:s",time());
              }else {
                $build_guide_array[$col] = $first_phase_value;
              }
            }elseif ($col == "ip") {
              $build_guide_array[$col] = $this->get_ip();
            }
          }
          // var_dump($build_guide_array);
        }else {
          // update or insert build_guide first, cuz build_guide has been read completely
          if (!$deal_table_build_guide) {
            $this->build_guide_insert_or_update($build_guide_array);
            $deal_table_build_guide = true;
            $data_to_db["build_id"] = $this->current_build_id;
          }
          foreach ($first_phase_value as $second_phase_key => $second_phase_value) {

            // echo "in checking type \n";
            // var_dump($second_phase_key);
            // var_dump(gettype($second_phase_value));
            if (gettype($second_phase_value) !="array") {
              // echo "not array tyype\n";
              // echo "$first_phase_key \n";
              $multiple_entry = false;
            }
            else {
              // echo "array tyype\n";
              //
              // echo "$first_phase_key \n";

              $multiple_entry = true;
            }

            break;
          }
          // if there is no multiple entry, we will add the build_id back to the table
          if(!$multiple_entry){
            // echo "not multiple entry the table name is " . $first_phase_key ."\n";

            $first_phase_value["build_id"] = $this->current_build_id;
            $this->set_validation($build_guide_array["build_id"],$first_phase_key,$first_phase_value);
            if ($first_phase_key == "rune_set") {
              // var_dump($first_phase_value);
              $first_phase_value["primary_rune"] = implode('-',$first_phase_value["primary_rune"]);
              $first_phase_value["secondary_rune"] = implode('-',$first_phase_value["secondary_rune"]);


            }
            if ($first_phase_key == "skill_order_table") {
              $first_phase_value["order_list"] = implode('-',$first_phase_value["order_list"]);
            }
            // var_dump(array_keys($first_phase_value)[0]);
            if ($this->set_validation=="create") {
              // var_dump($first_phase_value);
              $note_id = $this->insert_note($first_phase_value["note"],$this->current_build_id);
              $temp_note = $first_phase_value["note"];
              unset($first_phase_value["note"]);
              $first_phase_value["note_id"] = $note_id;
              // var_dump($first_phase_value);
              $first_phase_value[array_keys($first_phase_value)[0]] = $this->database->insert($first_phase_value,$first_phase_key);
              // var_dump($first_phase_value);
              if ($first_phase_key == "rune_set") {
                // var_dump($first_phase_value);
                $first_phase_value["primary_rune"] = explode('-',$first_phase_value["primary_rune"]);
                $first_phase_value["secondary_rune"] = explode('-',$first_phase_value["secondary_rune"]);

              }
              if ($first_phase_key == "skill_order_table") {
                $first_phase_value["order_list"] = explode('-',$first_phase_value["order_list"]);
              }
              unset($first_phase_value["note_id"]);
              $first_phase_value["note"] = $temp_note;
              unset($first_phase_value["build_id"]);
              $data_to_db[$first_phase_key] = $first_phase_value;

              // array_push($this->create_response_array,[$first_phase_key=>$this->database->insert($first_phase_value,$first_phase_key)]);
              // var_dump($this->create_response_array);
              $this->set_validation=="";
            }elseif ($this->set_validation=="update") {
              unset($first_phase_value["build_id"]);
              $temp_pk = $first_phase_value[$this->set_pri_key];
              unset($first_phase_value[$this->set_pri_key]);
              $this->db_validation->query('SELECT note_id from '.$first_phase_key.' where '.$this->set_pri_key.' = '.$temp_pk);
              $specific_note_id = $this->db_validation->resultset();
              $specific_note_id = $specific_note_id[0]["note_id"];
              // var_dump($specific_note_id);
              $this->update_note($first_phase_value["note"],$specific_note_id);
              $temp_note = $first_phase_value["note"];
              unset($first_phase_value["note"]);
              $this->database->update($first_phase_value,$first_phase_key, "build_id = ".$this->current_build_id." and ".$this->set_pri_key." = ".$temp_pk);
              $this->set_validation=="";
              if ($first_phase_key == "rune_set") {
                // var_dump($first_phase_value);
                $first_phase_value["primary_rune"] = explode('-',$first_phase_value["primary_rune"]);
                $first_phase_value["secondary_rune"] = explode('-',$first_phase_value["secondary_rune"]);

              }
              if ($first_phase_key == "skill_order_table") {
                $first_phase_value["order_list"] = explode('-',$first_phase_value["order_list"]);
              }
              $first_phase_value["note"] = $temp_note;
              // $data_to_db[$first_phase_key] = $first_phase_value;
              // echo $this->set_pri_key . '\n';
              $temp_array[$this->set_pri_key] = $temp_pk;
              array_merge_recursive($temp_array,$data_to_db[$first_phase_key]);
              // var_dump($data_to_db);
            }else {
              throw new Exception(2);
            }
          }
          else {
            // there is mutiple entry, need to do it saperately
            // var_dump($first_phase_value);
            // echo "Jerry is good as fuck";
            // echo "multiple entry the table name is " . $first_phase_key ."\n";

            foreach ($first_phase_value as $data_set => $data_set_col_entry) {
              switch ($first_phase_key) {
                case 'item_detail_set':
                    // special case is that the table doesn't has build_id as FK

                    // echo "In the swtich special case the table name is " . $first_phase_key ."\n";
                    // var_dump($fk_for_item_detail[$forloop_count]);
                    // var_dump($data_set_col_entry);
                    if ($data_set_col_entry["item_set_id"] == 0) {
                      $data_set_col_entry["item_set_id"] = $fk_for_item_detail[$forloop_count];
                      $data_set_col_entry["items"] = json_encode($data_set_col_entry["items"]);
                      $particular_fk = $this->database->insert($data_set_col_entry,$first_phase_key);
                      $data_to_db[$first_phase_key][$data_set]["detail_id"] = $particular_fk;
                      $data_to_db[$first_phase_key][$data_set]["item_set_id"] = $fk_for_item_detail[$forloop_count];

                      // var_dump($data_to_db);
                      $forloop_count ++;

                      // array_push($this->create_response_array,[$first_phase_key=>[$data_set=>$particular_fk]]);
                    }else {
                      $this->set_validation = data_validation::special_set_validation("item_set_id",$data_set_col_entry["item_set_id"],$first_phase_key,$data_set_col_entry);
                      if ($this->set_validation=="update") {
                        $temp_pk = $data_set_col_entry[$this->set_pri_key];
                        $data_set_col_entry["items"] = json_encode($data_set_col_entry["items"]);
                        $this->database->update($data_set_col_entry,$first_phase_key,$this->set_pri_key." = ".$temp_pk);
                      }else {
                        throw new Exception(2);
                      }

                    }

                    break;
                    // $this->database->query('INSERT INTO champions (champion_id, champion_name, data)
                    //                     VALUES (:champion_id, :champion_name, :data)')
                    //                 ->bind(':champion_name', $champion_name)
                    //                 ->bind(':champion_id', $champion_data["id"])
                    //                 ->bind(':data',json_encode($champion_data))
                    //                 ->execute();
                case 'skill_order_table':
                      // var_dump($data_set_col_entry);
                  break;
                default:
                    // default case is that the table has build_id as FK
                    $data_set_col_entry["build_id"] = $this->current_build_id;
                    // var_dump($data_set_col_entry);
                    // echo "the table name is " .$first_phase_key . "\n";
                    // var_dump($data_set_col_entry);
                    if ($data_set_col_entry["remove"]) {
                      $first_value = array_keys($data_set_col_entry);
                      $this->set_pri_key = $first_value[0];
                      $this->db_validation->query('DELETE FROM '.$first_phase_key.' where '.$this->set_pri_key.' = :pk_value')
                                          ->bind(':pk_value', $data_set_col_entry[$this->set_pri_key])
                                          ->execute();
                      // var_dump($data_to_db[$first_phase_key]);
                      unset($data_to_db[$first_phase_key][$data_set]);
                      // var_dump($data_to_db[$first_phase_key]);
                      $against_temp_array = [];
                      foreach ($data_to_db[$first_phase_key] as $key => $value) {
                        array_push($against_temp_array,$value);
                        // var_dump($against_temp_array);
                      }
                      // for ($i=0; $i < sizeof($data_to_db[$first_phase_key]); $i++) {
                      //     echo "the index is " . $i ."\n";
                      //     var_dump($data_to_db[$first_phase_key][$i]);
                      //     // array_push($against_temp_array,$data_to_db[$first_phase_key][$i]);
                      // }
                      $data_to_db[$first_phase_key] = $against_temp_array;
                      // var_dump($data_to_db);
                      continue;
                    }else {
                      unset($data_set_col_entry["remove"]);
                    }
                    unset($data_set_col_entry["set_location"]);
                    if($first_phase_key == "item_set"){
                      // var_dump($data_set_col_entry);
                      $data_set_col_entry["set_name"] = htmlentities($data_set_col_entry["set_name"]);
                    }
                    $this->set_validation($data_set_col_entry["build_id"],$first_phase_key,$data_set_col_entry);
                    if ($this->set_validation=="create") {
                      $note_id = $this->insert_note($data_set_col_entry["note"],$this->current_build_id);
                      unset($data_set_col_entry["note"]);
                      $data_set_col_entry["note_id"] = $note_id;

                      $particular_fk = $this->database->insert($data_set_col_entry,$first_phase_key);
                      $first_value = array_keys($data_set_col_entry);

                      $this->set_pri_key = $first_value[0];
                      $data_set_col_entry[$this->set_pri_key] = $particular_fk;
                      $data_to_db[$first_phase_key][$data_set][$this->set_pri_key] = $particular_fk;
                      // var_dump($data_to_db);
                      // array_push($this->create_response_array,[$first_phase_key=>[$data_set=>$particular_fk]]);
                      // var_dump($this->create_response_array);
                      if ($first_phase_key == "item_set") {
                        array_push($fk_for_item_detail,$particular_fk);
                      }
                      $this->set_validation="";
                    }elseif ($this->set_validation=="update") {
                      unset($data_set_col_entry["build_id"]);
                      $temp_pk = $data_set_col_entry[$this->set_pri_key];
                      unset($data_set_col_entry[$this->set_pri_key]);

                      $this->db_validation->query('SELECT note_id from '.$first_phase_key.' where '.$this->set_pri_key.' = '.$temp_pk);
                      $specific_note_id = $this->db_validation->resultset();
                      $specific_note_id = $specific_note_id[0]["note_id"];
                      // var_dump($specific_note_id);
                      $this->update_note($data_set_col_entry["note"],$specific_note_id);
                      unset($data_set_col_entry["note"]);

                      $this->database->update($data_set_col_entry,$first_phase_key,"build_id = ".$this->current_build_id." and ".$this->set_pri_key." = ".$temp_pk);
                      $temp_array[$this->set_pri_key] = $temp_pk;
                      // var_dump($data_to_db[$first_phase_key][$data_set]);
                      $this->set_validation="";
                    }else {
                      throw new Exception(2);

                    }
                    break;
              }
            }
          }
        }
      }
      // echo "<pre>";

      // var_dump($this->create_response_array);
      $last_key = "";
      // $final_form = call_user_func_array('array_merge_recursive',$this->create_response_array);
      if ($this->build_create_flag) {
        $final_form["build_id"] = $this->current_build_id;
      }
      // var_dump($data_to_db);
      // var_dump($final_form);
      // $temp_keys = array_keys($this->create_response_array);

      // foreach ($this->create_response_array as $key => $value) {
      //   $array_key = array_keys($value[0]);
      //   // var_dump($value);
      // }
      // echo "</pre>";
      return $data_to_db;
    }
  }
}
?>
