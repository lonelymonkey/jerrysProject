<?php

include '../includes/surf_global.inc';
$nameErr = $emailErr =  "";
$name = $email = $comment = $rate = $gender =  "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);

  }

  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  }

  else {
    $email = test_input($_POST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }

  if (empty($_POST["comment"])) {
    $comment = "No Comment submitted";
  } else {
    $comment = test_input($_POST["comment"]);
  }
  if (empty($_POST["Rate"])) {
    $rate = "no rating";
  } else {
    $rate = test_input($_POST["Rate"]);
  }
  if (empty($_POST["gender"])) {
    $gender = "Not specific";
  } else {
    $gender = test_input($_POST["gender"]);
  }
}
// pringting HTML..............................................................................................................................................................
$active = 'class = "active"';
$var1 ='<div class="right">
  				<div class="Experience_title">
              		I hold a title
                </div>
              	<div class="Experience_content">
                <div class = "Experience_subtitle">
                   Please Leave your Email, Name, and Experience of Our Service. We appriciate it
                </div>
                <form action="experiences_sharing.php" method = "post">
    							<p class = "input_title">Your Name:</p><br>
    							<input type="text" name="name" size ="48">
    							<span class = "error">*'. $nameErr.'</span>
    							<br>
    							<p class = "input_title">Email Address:</p><br>
    							<input type="text" name="email" size ="48">
    							<span class = "error"> *'. $emailErr.'</span>
    							<br>
    							<p class = "input_title">Message:</p><br>
                  <p class = "input_title">Gender:</p>
                  <input type="radio" name="gender" value="female"><span class = "gender">Female
                  <input type="radio" name="gender" value="male"><span class = "gender">Male
                  <br><br>
                  <p class = "input_title">Rating:</p>
                  <input type="radio" name="Rate" value="1 stars"><span class = "rating">*
                  <input type="radio" name="Rate" value="2 stars"><span class = "rating">**
                  <input type="radio" name="Rate" value="3 stars"><span class = "ratingr">***
                  <input type="radio" name="Rate" value="4 stars"><span class = "rating">****
                  <input type="radio" name="Rate" value="5 stars"><span class = "rating">*****
                  <br><br>
                  <p class = "input_title">comment and Suggestion:</p>
                  <br>
                  <textarea class ="comment"  name="Comment" rows = "10" cols = "49"  size ="48">
    							</textarea>
    							<br><br>

    							<input class ="send" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';
style();
printHeader();
printcontent($var1,$active,6);
printFooter();
if ($name != "" and $email!= "" and $emailErr != "Invalid email format"){
  $J_decode=array();

  if(file_exists("experience.json") == TRUE){
    $myfile = fopen("experience.json","r") or die( "cant open the file!");
    $test2 = fread($myfile,filesize("output.json"));
    $J_decode = json_decode($test2,true);
    fclose($myfile);
  }

  $temp = array("Name"=>$name, "email"=>$email,"comment"=>$comment, "rate"=>$rate,"gender" => $gender);
  $J_decode[count($J_decode)+1] = $temp;
  $myfile = fopen("experience.json","w") or die( "cant open the file!");
  $outcome = json_encode($J_decode) ;
  fwrite($myfile ,$outcome);
  fclose($myfile);

  }
?>
