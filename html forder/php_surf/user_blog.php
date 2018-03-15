<?php

include '../includes/surf_global.inc';
$nameErr = $emailErr = $commentErr ="";
$name = $email = $comment = $rate = $gender =  "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);

  }
    $_POST["comment"] = trim($_POST["comment"]);
  if (empty($_POST["comment"])) {
    $commentErr = "No Comment submitted";
  } else {
    $comment = test_input($_POST["comment"]);
  }

}
// pringting HTML..............................................................................................................................................................

$var1 ='<div class="right">
  				<div class="user_blog_title">
              		Write Your Blog
                </div>
              	<div class="Experience_content">

                <form action="user_blog.php" method = "post">
    							<p class = "input_title">Your Name:</p><br>
    							<input type="text" name="name" class ="input_box">
                  <br>
    							<span class = "error">*'. $nameErr.'</span>
    							<br>

                  <p class = "input_title">comment and Suggestion:</p>
                  <br>
                  <textarea class ="comment_box"  name="comment"  ></textarea>  <br>
                  <span class = "error"> *'. $commentErr.'</span>
    							<br><br>

    							<input class ="send" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';
style();
printHeader();
printcontent($var1,7);
printFooter();
if ($name != "" and $comment!= "" ){
  $J_decode=array();

  if(file_exists("blog.json") == TRUE){
    $myfile = fopen("blog.json","r") or die( "cant open the file!");
    $test2 = fread($myfile,filesize("blog.json"));
    $J_decode = json_decode($test2,true);
    fclose($myfile);
  }

  $temp = array("Name"=>$name, "comment"=>$comment);
  $J_decode[count($J_decode)+1] = $temp;
  $myfile = fopen("blog.json","w") or die( "cant open the file!");
  $outcome = json_encode($J_decode) ;
  fwrite($myfile ,$outcome);
  fclose($myfile);

  }
?>
