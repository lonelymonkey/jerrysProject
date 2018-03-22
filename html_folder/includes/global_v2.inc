<?php

ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);

//error_reporting(0);


include 'config.inc';
include INCLUDE_PATH . '/JerryDatabass.class.inc';
include INCLUDE_PATH . '/template.inc';
class function_surf{
  public function print_blog($name,$comment,$id){

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
  			<div class = "blog_paragraph">
  		 		'.$comment.'
        <div class = "read_more">
          <a class = "style_read" href="full_comment.php?val='.$id.'">Read more</a>

        </div>


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
  public function contact($name,$comment,$email){
    $database = new Database();
    $database->query('INSERT INTO contact (name, email, msg) VALUES (:name, :email, :msg)');
    $database->bind(':name', $name)->bind(':email',$email)->bind(':msg',$comment);
    $database->execute();
    }
  public function user_blog($name,$comment){
    $database = new Database();
    $database->query('INSERT INTO user_blog (name,msg) VALUES (:name, :msg)');
    $database->bind(':name', $name)->bind(':msg',$comment);
    $database->execute();
    }
    public function experience($name,$comment,$email,$gender,$rate){
      $database = new Database();
      $database->query('INSERT INTO experiences_sharing (name,email,comment,rate,gender) VALUES (:name, :email, :msg, :rate, :gender)');
      $database->bind(':name', $name)->bind(':email',$email)->bind(':msg',$comment)->bind(':rate',$rate)->bind(':gender',$gender);
      $database->execute();
      }
}
?>
