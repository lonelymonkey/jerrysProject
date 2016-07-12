<?php

ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

//error_reporting(0);


include 'config.inc';
#include INCLUDE_PATH . '/database.class.inc';
include INCLUDE_PATH . '/template.inc';
class function_surf{
  public function print_blog($name,$comment){

  $output = '
  <div class = "blog_para">
  		<div class ="blog_img">
  			<div class ="blog_pic">
  				<img class = "image" src = "images/News/1st pic.png" >
  			</div>
  			<div class = "date_circle">
  				<div class = "circle">
  					<img class = "image" src = "images/News/circle.png" >
  				</div>
  				<div class = "date">
  					SEPT <br>2012
  				</div>
  			</div>
  		</div>
  		<div class = "blog_words">
  			<div class = "blog_title">
  				'.$name.'
  			</div>
  			<div class = "blog_para">
  		 		'.$comment.'
  			</div>
  		</div>

  	</div>';

   return $output;
  }
  public function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
  }
  public function store_file($filename,$name,$comment,$email,$gender,$rating){
    $J_decode=array();

    if(file_exists($filename) == TRUE){
      $myfile = fopen($filename,"r") or die( "cant open the file!");
      $test2 = fread($myfile,filesize($filename));
      $J_decode = json_decode($test2,true);
      fclose($myfile);
    }

    $temp = array("Name"=>$name, "comment"=>$comment,"email"=>$email,"gender"=>$gender,"rating"=>$rating);
    $J_decode[count($J_decode)+1] = $temp;
    $myfile = fopen($filename,"w") or die( "cant open the file!");
    $outcome = json_encode($J_decode) ;
    fwrite($myfile ,$outcome);
    fclose($myfile);


  }


}
?>
