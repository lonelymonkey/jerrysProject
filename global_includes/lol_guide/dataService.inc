<?php
include "db_helper.inc";
if (!class_exists('dataServiceRead')) {
  class dataServiceRead {
    private $database;
    private $champion_array_type_data;
    private $champion_spell;
    private $champion_passive;
    public $response = ["champions"=>[],
                        "items"=>[],
                        "spells"=>[],
                        "builds"=>[]
                      ];
    public function __construct() {
      $this->database = new Database();
    }
    public function get_build_sets($build_id){
      var_dump($build_id);
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

        $this->database->query('select * from build_guide order by champion_id DESC');

        $build_return_data = $this->database->resultset();

        $this->response["builds"] = $build_return_data;
        // var_dump($this->response);

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
        echo "I am in the set validation \n";
        echo $table_name . "   " . $build_id ."\n";

        $this->db_validation->query('select * from '.$table_name.' where build_id =
                                    :build_id')
                            ->bind(':build_id',$build_id);
        $table_col_and_entry = $this->db_validation->resultset();
        var_dump($table_col_and_entry);
        if ($table_col_and_entry == NULL) {
          echo "\n table_col_and_entry empty \n";
          $this->set_validation = "create";
        }else {
          echo "\n table_col_and_entry NOT empty \n";

          $first_value = array_keys($table_col_and_entry[0]);
          $this->set_pri_key = $first_value[0];
          if ($phase_value[$this->set_pri_key]==0) {
            var_dump($phase_value);
            $this->set_validation = "create";
          }
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
        $this->current_build_id = $this->database->insert($input_array,"build_guide");
        $this->create_response_array["build_id"]=$this->current_build_id;
        return $this->current_build_id;
      }else {
        if ($this->user_validation($input_array["build_id"],$input_array["user_id"])) {
          $temp_build_id = $input_array["build_id"];
          $this->current_build_id = $input_array["build_id"];
          unset($input_array["build_id"]);
          unset($input_array["date_create"]);
          // var_dump($input_array);
          // echo "build id is " . $temp_build_id ."\n";
          $this->database->update($input_array,"build_guide","build_id = ".$temp_build_id);
        }else {
          return -1;
        }
      }
    }
    // $this->db_validation->query('DELETE FROM '.$first_phase_key.' where '.$this->set_pri_key.' = :pk_value')
    //                     ->bind(':pk_value', $data_set_col_entry[$this->set_pri_key])
    //                     ->execute();

    private function special_set_validation($special_fk_name,$special_fk_value,$table_name,$phase_value){
      $this->db_validation->query('select * from '.$table_name.' where '.$special_fk_name.' =
                                  :fk_value')
                          ->bind(':fk_value',$special_fk_value);
      $table_col_and_entry = $this->db_validation->resultset();
      echo "in special set validation \n";
      var_dump($table_col_and_entry);
      $first_value = array_keys($table_col_and_entry[0]);
      $this->set_pri_key = $first_value[0];
      if ($table_col_and_entry[0][$this->set_pri_key] == $phase_value[$this->set_pri_key]) {
        $this->set_validation = "update";
        echo "detail_id match\n";
      }else {
        $this->set_validation = "";
      }

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
                            "skin_id"=>0];
      echo "<pre>";
      // var_dump($data_to_db);
      //if $first_phase_value is array, which is dealing table
      //if $first_phase_value is not array, they are col and entry of build_guide
      foreach ($data_to_db as $first_phase_key => $first_phase_value) {
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
            }
          }
          // var_dump($build_guide_array);
        }else {
          // update or insert build_guide first, cuz build_guide has been read completely
          if (!$deal_table_build_guide) {
            $this->build_guide_insert_or_update($build_guide_array);
            $deal_table_build_guide = true;
          }


          // $this->database->query('INSERT INTO champions (champion_id, champion_name, data)
          //                     VALUES (:champion_id, :champion_name, :data)')
          //                 ->bind(':champion_name', $champion_name)
          //                 ->bind(':champion_id', $champion_data["id"])
          //                 ->bind(':data',json_encode($champion_data))
          //                 ->execute();

          foreach ($first_phase_value as $second_phase_key => $second_phase_value) {
            if (gettype($second_phase_value) !="array") {
              $multiple_entry = false;
              break;
            }
            else {
              $multiple_entry = true;
              break;
            }
          }
          // if there is no multiple entry, we will add the build_id back to the table
          if(!$multiple_entry){
            echo "the table name is " . $first_phase_key ."\n";
            $first_phase_value["build_id"] = $this->current_build_id;
            $this->set_validation($build_guide_array["build_id"],$first_phase_key,$first_phase_value);
            if ($this->set_validation=="create") {
              array_push($this->create_response_array,[$first_phase_key=>$this->database->insert($first_phase_value,$first_phase_key)]);
              var_dump($this->create_response_array);
              $this->set_validation=="";
            }elseif ($this->set_validation=="update") {
              unset($first_phase_value["build_id"]);
              $temp_pk = $first_phase_value[$this->set_pri_key];
              unset($first_phase_value[$this->set_pri_key]);
              $this->database->update($first_phase_value,$first_phase_key, "build_id = ".$this->current_build_id." and ".$this->set_pri_key." = ".$temp_pk);
              $this->set_validation=="";
            }else {
              return -1;
            }
          }
          else {
            // there is mutiple entry, need to do it saperately
            // var_dump($first_phase_value);
            foreach ($first_phase_value as $data_set => $data_set_col_entry) {
              switch ($first_phase_key) {
                case 'item_detail_set':
                    // special case is that the table doesn't has build_id as FK
                    echo "In the swtich special case the table name is " . $first_phase_key ."\n";
                    var_dump($fk_for_item_detail[$forloop_count]);
                    var_dump($data_set_col_entry);
                    if ($data_set_col_entry["item_set_id"] == 0) {
                      $data_set_col_entry["item_set_id"] = $fk_for_item_detail[$forloop_count];
                      $forloop_count ++;
                      $data_set_col_entry["items"] = json_encode($data_set_col_entry["items"]);
                      $particular_fk = $this->database->insert($data_set_col_entry,$first_phase_key);
                      array_push($this->create_response_array,[$first_phase_key=>[$data_set=>$particular_fk]]);
                    }else {
                      $this->special_set_validation("item_set_id",$data_set_col_entry["item_set_id"],$first_phase_key,$data_set_col_entry);
                      if ($this->set_validation=="update") {
                        $temp_pk = $data_set_col_entry[$this->set_pri_key];
                        $data_set_col_entry["items"] = json_encode($data_set_col_entry["items"]);
                        $this->database->update($data_set_col_entry,$first_phase_key,$this->set_pri_key." = ".$temp_pk);
                      }else {
                        return -1;
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

                  break;
                default:
                    // default case is that the table has build_id as FK
                    $data_set_col_entry["build_id"] = $this->current_build_id;
                    // var_dump($data_set_col_entry);
                    echo "the table name is " .$first_phase_key;
                    if ($data_set_col_entry["remove"]) {
                      $first_value = array_keys($data_set_col_entry);
                      $this->set_pri_key = $first_value[0];
                      $this->db_validation->query('DELETE FROM '.$first_phase_key.' where '.$this->set_pri_key.' = :pk_value')
                                          ->bind(':pk_value', $data_set_col_entry[$this->set_pri_key])
                                          ->execute();
                      continue;
                    }else {
                      unset($data_set_col_entry["remove"]);
                    }
                    $this->set_validation($data_set_col_entry["build_id"],$first_phase_key,$data_set_col_entry);
                    if ($this->set_validation=="create") {
                      $particular_fk = $this->database->insert($data_set_col_entry,$first_phase_key);
                      array_push($this->create_response_array,[$first_phase_key=>[$data_set=>$particular_fk]]);
                      var_dump($this->create_response_array);
                      if ($first_phase_key == "item_set") {
                        array_push($fk_for_item_detail,$particular_fk);
                      }
                      $this->set_validation="";
                    }elseif ($this->set_validation=="update") {
                      unset($data_set_col_entry["build_id"]);
                      $temp_pk = $data_set_col_entry[$this->set_pri_key];
                      unset($data_set_col_entry[$this->set_pri_key]);
                      $this->database->update($data_set_col_entry,$first_phase_key,"build_id = ".$this->current_build_id." and ".$this->set_pri_key." = ".$temp_pk);
                      $this->set_validation="";
                    }else {
                      return -1;
                    }
                    break;
              }
            }
          }
        }
      }
      echo "</pre>";
      return $this->create_response_array;
    }
  }
}
?>
