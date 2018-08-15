<?php
if (!class_exists('clean_files')) {
include "db_helper.inc";


class clean_files
{
  private $database;
  private $db_helper;
  private $two_hr_time_stamp = 7200;
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
          if ($now - $record_time > $this->two_hr_time_stamp) {
            if (file_exists(file_path.$result_set[$i]["image_id"].".png")) {
              unlink(file_path.$result_set[$i]["image_id"].".png");
            }
          }
        }
      }
    }
    var_dump($result_set);
  }
  private function get_all_id (){
    $this->database->query('SELECT * from image_overview');
    return $this->database->resultset();

  }
  public function store_record(){
    $this->database->query('INSERT INTO image_overview (create_time) values (:create_time)')
                   ->bind(":create_time",date("Y-m-d G:i:s",time()));
    $this->database->execute();
    return $this->database->lastInsertId();
  }
}
}



 ?>
