<?php
include "JerryDatabase.class.inc";


class db_helper{
    function __construct()
    {
      $this->database = new Database();
    }
    public $database;
    public function insert($input_array = array(), $table_name) {
        // $r1DB = Database::getConnection();
        // echo "we are in db_helper : insert function, the below is the input array we want to save \n";
        // var_dump($input_array);
        $col_array = array();
        $val_array = array();
        $queryInput = array();
        $index = 0;
        foreach ($input_array AS $col => $val) {
            $varIndex = ':var'.$index;
            $col_array[] = $col;
            $val_array[] = $varIndex;
            $queryInput[$varIndex] = $val;
            $index++;
        }
        $query = 'insert into ' . $table_name . ' (' . implode(',', $col_array) . ') values(' . implode(',', $val_array) . ')';
        // echo $query ."<br>";
        // var_dump($queryInput);
        $this->database->query($query)
                       ->bindAll($queryInput)
                       ->execute();
        return $this->database->lastInsertId();
    }
    public function update($input_array = array(), $table_name, $where = '1=1') {
        // $r1DB = Database::getConnection();
        $update_array = array();
        $index = 0;
        foreach ($input_array AS $col => $val) {
            $varIndex = ':var'.$index;
            $update_array[] = $col . '=' . $varIndex ;
            $queryInput[$varIndex] = $val;
            $index++;
        }
        $query = 'update ' . $table_name . ' set ' . implode(',' , $update_array) . ' where ' .$where;
        //  echo $query ."<br>";
        // var_dump($queryInput);
        $this->database->query($query)
                      ->bindAll($queryInput)
                      ->execute();
    }
} ?>
