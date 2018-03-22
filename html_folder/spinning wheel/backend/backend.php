<?php
include 'Database.class.inc';
include 'config.inc';
$database = new Database();
$whole_set = $_POST;
# code here from database stuff

# in here, we load stuff from database, and then package them with json format



# when user click spin, the $bar is not empty, so php will give a randon number to front end, and front end also
# send the whole set to us as assocaitive array
if ($whole_set) {
  // we are storing our data in DB
  $setname = $whole_set["set_name"];
  $slice_name = $whole_set["name"];
  $distribution = $whole_set["sample"];
  $color = $whole_set["color"];
  // insert set name into wheelset
  $randon_number = rand(0,100)*0.01;
  echo $randon_number;
  $database->query('INSERT INTO Wheelset (name, createdDate)
  VALUES (:name,NOW())');
  $database->bind(':name',$setname);
  $database->execute();
  // if we have the same name, we make sure we want the id which is the largest
  $database->query('SELECT setId FROM wheelset where name = :setname');
  $database->bind(':setname',$setname);
  //$database->query('SELECT * FROM user_blog where id = '.$DataId.'');
  $set_id_from_DB = $database->resultset();
  $desire_setID = $set_id_from_DB[count($set_id_from_DB)-1];
  //var_dump($desire_setID["setId"]);
  for ($i=0; $i < count($whole_set["id"]); $i++) {
    insert_into_probabilityslice($desire_setID["setId"], $slice_name[$i],$distribution[$i],$color[$i]);
  }

  $winner_entry = decide_output($randon_number,$distribution);
  //var_dump($slice_name);
  insert_into_wheelsetresult($desire_setID["setId"], $winner_entry, $distribution[$winner_entry], $color[$winner_entry]);

  //$database->query('SELECT * FROM Wheelset where ');
  //$database->execute();
  //$database->query("INSERT INTO probabilitySlice (setId, name, distribution,colorCode)
  //VALUES ()");
  //$database->execute();

  //var_dump($bar);
  # set_name goes to table : wheelset;
  # other go to
}


else {
  #rest of time, php will keep uploading the top 5 set to the front end
  #We have load the data from database and package them as json format, not we send our json to front end
  $dataset = ["Jerry"=>"best","bill"=>"hehe"];
  var_dump($dataset);
}
function insert_into_wheelsetresult ($setId, $winner_entry, $sample, $color){
  global $database;
  $database->query('INSERT INTO wheelsetresult (setId, winner, distribution, colorCode)
  VALUES (:setId,:winner,:distribution,:colorCode)');
  $database->bind(':setId',$setId)->bind(':winner',$winner_entry)->bind(':distribution',$sample)->bind(':colorCode',$color);
  $database->execute();
}
function decide_output($winner_number,$distribution){
 $total = 0;
 $total_prob = 0;
 $target = 0;
 $probability_array = array();
 for ($i=0; $i < count($distribution) ; $i++) {
   $total += $distribution[$i];
 }
 for ($i=0; $i < count($distribution); $i++) {
   array_push($probability_array, $distribution[$i]/$total);
 }
 for ($i=0; $i < count($distribution); $i++) {
   $total_prob = $total_prob + $probability_array[$i];
 //  console.log("total_prob is " + total_prob);

   if ($winner_number < $total_prob) {
     $target = $i;
     break;
   }

 }
 return $target;
}
function insert_into_probabilityslice($setId, $name, $sample, $color) {
  global $database;
  $database->query('INSERT INTO probabilitySlice (setId, name, distribution, colorCode)
  VALUES (:setId,:name,:distribution,:colorCode)');
  $database->bind(':setId',$setId)->bind(':name',$name)->bind(':distribution',$sample)->bind(':colorCode',$color);
  $database->execute();
}

?>
