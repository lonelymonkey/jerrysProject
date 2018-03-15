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

        // var_dump($items_return_data);

        $this->response["items"] = $items_return_data;

        $this->database->query('select * from spell');
                        // ->bind(':champion_id', $champion_data["id"]);
        $spell_return_data = $this->database->resultset();
        // var_dump($spell_return_data);

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
    public $data_to_db;
    private $database;
    private $db_validation;
    private $current_build_id = 0;
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
    private function insert_or_update ($table_name, $build_id){
      $queryInput = "SELECT * FROM " . $table_name . " where build_id = ".$build_id;
      $this->db_validation->query($queryInput);
      $validation_result = $this->db_validation->resultset();
      // var_dump($validation_result);
      if ($validation_result == NULL) {
        // echo "the array is empty, which is what I want";
        return false;
      }else {
        return true;
      }
    }
    private function user_validation($build_id,$user_id){
      $this->db_validation->query('select build_id from build_guide where user_id =
                                  '.$user_id);
      $all_build_id = $this->db_validation->resultset();
      // var_dump($all_build_id);
      foreach ($all_build_id as $build => $build_id) {
        if ($build_id == $build_id) {
          return true;
        }
      }
      return false;

    }
    private function set_validation($build_id,$table_name){
      // echo "I am in the set validation \n";
      // echo $table_name . "   " . $build_id;
        $this->db_validation->query('select * from '.$table_name.' where build_id =
                                    '.$build_id);
        $table_col_and_entry = $this->db_validation->resultset();
        var_dump($table_col_and_entry);
        if ($table_col_and_entry == NULL) {
          echo "\n empty \n";
          return "create";
        }else {
          echo "\n not empty \n";

          return "update";
        }
    }
    private function build_guide_insert_or_update ($input_array){
      if ($input_array["build_id"]==0) {
        $this->current_build_id = $this->database->insert($input_array,"build_guide");
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

    public function save_data($data_to_db) {
      $build_created = false;
      $build_guide_array = ["build_id"=>0,
                            "user_id"=>0,
                            "champion_id"=>0,
                            "date_create"=>"",
                            "update_time"=>"",
                            "build_name"=>"",
                            "skin_id"=>0];
      // var_dump($data_to_db);
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
          echo $first_phase_key . "\n above is table name \n";
          if ($first_phase_key != "spell_set") {
            continue;

          }
          if (!$build_created) {
            $this->build_guide_insert_or_update($build_guide_array);
            $build_created = true;
          }
          echo "above is saving build_guide\n";
          $first_phase_value["build_id"] = $this->current_build_id;
          var_dump($first_phase_value);
          if ($this->set_validation($build_guide_array["build_id"],$first_phase_key)=="create") {
            $this->database->insert($first_phase_value,$first_phase_key);
          }else

          $this->database->update($first_phase_value,$first_phase_key,"build_id = ".$this->current_build_id);

        }
      }
    }
  }
}

?>
