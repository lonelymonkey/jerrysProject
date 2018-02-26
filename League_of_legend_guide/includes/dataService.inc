<?php
include "db_helper.inc";
if (!class_exists('dataServiceRead')) {
  class dataServiceRead {
    private $database;
    public $response;
    public function __construct() {
      $this->database = new Database();
    }
    public function get_Champion() {
        $this->database->query('select * from champions');
                        // ->bind(':champion_id', $champion_data["id"]);
        $champion_return_data = $this->database->resultset();

        // echo $champion_data["id"] . "<br>";
        // echo $champion_data["name"] . "<br>";
        // var_dump(json_decode($champion_return_data[0]["data"],true));
        // var_dump($champion_return_data);
        $this->response = $champion_return_data;
        return $this->response;
      // return "get champion complete";
    }
    public function get_items ($data ) {
      $this->database->query('select * from items');
                      // ->bind(':champion_id', $champion_data["id"]);
      $champion_return_data = $this->database->resultset();

      // echo $champion_data["id"] . "<br>";
      // echo $champion_data["name"] . "<br>";
      // var_dump(json_decode($champion_return_data[0]["data"],true));
      // var_dump($champion_return_data);
      $this->response = $champion_return_data;
      return $this->response;
    }
    public function get_spell ($data ) {
      $this->database->query('select * from spell');
                      // ->bind(':champion_id', $champion_data["id"]);
      $champion_return_data = $this->database->resultset();

      // echo $champion_data["id"] . "<br>";
      // echo $champion_data["name"] . "<br>";
      // var_dump(json_decode($champion_return_data[0]["data"],true));
      // var_dump($champion_return_data);
      $this->response = $champion_return_data;
      return $this->response;
    }
    public function log_in() {
      $this->database->query('select * from user');
      $retur_user_name = $this->database->resultset();
      $this->response = $retur_user_name;
      return $this->response;
    }
    public function view_all_build(){
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
    private $current_build_id;
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
    private function user_build_info_validation ($table_name, $col_and_entry){
      foreach ($col_and_entry as $col_name => $col_value) {
        if ($col_name == "user_id") {
          $user_id_for_validation = $col_and_entry[$col_name];
        }
        if ($col_name = "build_id") {
          $build_id_for_validation = $col_and_entry[$col_name];
        }
      }
      // echo "the current build id is " . $build_id_for_validation;
      $this->db_validation->query('select build_id from build_guide where user_id =
                                  '.$user_id_for_validation);
      $all_build_id = $this->db_validation->resultset();

      for ($i=0; $i < sizeof($all_build_id) ; $i++) {
        foreach ($all_build_id[$i] as $build_id => $value) {
          if ($value == $build_id_for_validation) {
            $this->current_build_id = $value;
            // echo " \nthe current build id is " . $build_id_for_validation .
            //                                     "and its exist in db, called " . $value;
            return true;
          }
        }
      }
      return false;
    }
    private function build_and_its_set_validation($build_id){
      if ($build_id == $this->current_build_id) {
        return true;
      }else {
        return false;
      }
    }
    public function save_data($data_to_db) {
      // echo "we are in data_service: save_data function \n";
      if (sizeof($data_to_db) >=2 ) {
        // echo "the size of array is " . sizeof($data_to_db);
        # handel 2 or more tables
        foreach ($data_to_db as $table_name => $col_and_entry) {
          // $this->update_or_create($table_name);
          // echo "The table name is " .$table_name . "\n" . "the col_and_entry is \n" ;
          // var_dump($col_and_entry);

          switch ($table_name) {
            case 'build_guide':
              if ($this->user_build_info_validation($table_name, $col_and_entry)) {
                foreach ($col_and_entry as $col_name=>$col_value) {
                  if ($col_name == "update_time") {
                    $col_and_entry[$col_name] = date("Y-m-d G:i:s",time());
                    $update_time_array = ["update_time"=>$col_and_entry[$col_name]];
                  }
                  if ($col_name == "build_id") {
                    $build_id = $col_and_entry[$col_name];
                  }
                }
                $this->database->update($update_time_array, $table_name,"build_id = ". $build_id);
                break;
              }else {
                return "err : build_id does not belong to this user";
              }


            default:
            foreach ($col_and_entry as $col_name=>$col_value) {
              // echo "the table name is ". $table_name ."\n";
              // var_dump($col_and_entry);
              if ($col_name == "build_id") {
                $build_id = $col_and_entry[$col_name];
              }
            }
            if ($this->insert_or_update($table_name, $build_id)) {
              if ($this->build_and_its_set_validation($build_id)) {
                $this->database->update($col_and_entry, $table_name,"build_id = ". $build_id);
              }else {
                return "err : build_id does not match";
              }
            }else {
              $this->database->insert($col_and_entry, $table_name);
            }
              break;
          }
        // var_dump($col_and_entry);
          // insert database
        }

        return "data save successfully";
      }else {
        #handle create build
        // echo "the size of array is " . sizeof($data_to_db);
        # handel 2 or more tables
        foreach ($data_to_db as $table_name => $col_and_entry) {
          // $this->update_or_create($table_name);
          // echo "The table name is " .$table_name . "\n" . "the col_and_entry is \n" ;
          // var_dump($col_and_entry);

          foreach ($col_and_entry as $col_name=>$col_value) {
            if ($col_name == "date_create") {
              $col_and_entry[$col_name] = date("Y-m-d G:i:s",time());
              $col_and_entry["update_time"] = $col_and_entry[$col_name];
              // echo "The below is testing the time is change or not \n";
              // var_dump($col_and_entry);
            }
          }
          // var_dump($col_and_entry);
          // insert database
          return $this->database->insert($col_and_entry, $table_name);
        }

      }


      // $this->data_to_db = $data_to_db;
      // $this->database->query("INSERT into spell_set (build_id, spell_id_1, spell_id_2,note_id)
      //                                           values( :build_id, :spell_id_1, :spell_id_2,:note_id)")
      //                 ->bind(':build_id', $data_to_db["build_id"])
      //                 ->bind(':spell_id_1', 1)
      //                 ->bind(':spell_id_2', 2)
      //                 ->bind(':note_id', 1)
      //                 ->execute();
      // var_dump($data_to_db);

    }
  }
}


?>
