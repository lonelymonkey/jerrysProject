<?php
if (!class_exists('clean_files')) {
include "db_helper.inc";


class clean_files
{
  private $database;
  private $db_helper;
  private $two_hr_time_stamp = 3600;
  function __construct()
  {
    $this->database = new Database();
    $this->db_helper = new db_helper();

  }
  public function clean_dir (){
    $result_set = $this->get_all_id();
    for ($i=0; $i < sizeof($result_set) ; $i++) {
      foreach ($result_set[$i] as $key => $value) {
        if ($key == "create_time") {
          $now = strtotime("now");
          $record_time = strtotime($value);
          // var_dump($result_set[$i]);
          if ($now - $record_time > $this->two_hr_time_stamp) {
            if (file_exists(file_path.$result_set[$i]["image_id"].".".$result_set[$i]["image_type"])) {
              // echo "the sting is correct \n";
              // echo "file number is ".$result_set[$i]["image_id"];

              unlink(file_path.$result_set[$i]["image_id"].".".$result_set[$i]["image_type"]);
              $this->clean_sub_files($result_set[$i]["image_id"],$result_set[$i]["image_type"]);
              // $this->clean_sub_files(386,$result_set[$i]["image_type"]);

          }
        }
      }
    }
    // var_dump($result_set);
  }
}
  private function clean_sub_files ($image_id,$file_type){
    $this->database->query('SELECT effect_photo_id ,create_time from image_effect where original_photo_id = :original_photo_id')
                   ->bind(':original_photo_id',0);
    $result_set = $this->database->resultset();

    for ($i=0; $i < sizeof($result_set); $i++) {
      // var_dump($result_set[$i]);
      $now = strtotime("now");
      $record_time = strtotime($result_set[$i]['create_time']);
      if ($now - $record_time > $this->two_hr_time_stamp) {
        if (file_exists(file_path.$result_set[$i]["effect_photo_id"].".".$file_type)) {
          // echo "the sting is correct \n";
          // echo "file number is ".$result_set[$i]["image_id"];

          unlink(file_path.$result_set[$i]["effect_photo_id"].".".$file_type);
          // $this->clean_sub_files($result_set[$i]["image_id"],$result_set[$i]["image_type"]);

        }
      }
    }
  }
  private function get_all_id (){
    $this->database->query('SELECT * from image_overview');
    return $this->database->resultset();

  }
  public function store_record($type){
    // echo gettype($type);
    $image_type = str_replace("image/","",$type);
    $this->database->query('INSERT INTO image_overview (create_time, image_type) values (:create_time,:image_type)')
                   ->bind(":create_time",date("Y-m-d G:i:s",time()))
                   ->bind(":image_type",$image_type);
    $this->database->execute();
    return $this->database->lastInsertId();
  }
}
}



 ?>
