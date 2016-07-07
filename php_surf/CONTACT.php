<?php

include '../includes/surf_global.inc';
$nameErr = $emailErr = $commentErr ="";
$name = $email = $comment =  "";
$temp = array();
$outcome = "";
$newline = "\n";

$test = array();
$test2 = '';
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

  $_POST["comment"] = trim($_POST["comment"]);

  if (empty($_POST["comment"])) {

    $commentErr = "Comment is required ";

  } else {
    $comment = test_input($_POST["comment"]);
  }
}

// pringting HTML

$active = 'class = "active"';
$var1 ='<div class = "right">
				<div class = "contact_top">
					<div class = "title">
						we want to here from you!
					</div>
					<div class = "sub_title">
						FREE WEBSITE TEMPLATES
					</div>
					<div class ="para">
						I hold some information here
					</div>
				</div>
				<div class = "contact_bot">
					<div class = "bot_left">
						<div class = "detail_title">
							CONTACT DETAILS
						</div>
						<div class = "location">
							LOCATION <br>
							This is just a place holder, so you can see what the site would look like
						</div>
						<div class = "separate_line">
							<img class = "image" src = "images/Contact/contact.png" >
						</div>
						<div class = "Email">
							EMAIL
							<p class = "email">
								zoj3zoj3@gmail
							</p>
						</div>
						<div class = "separate_line">
							<img class = "image" src = "images/Contact/contact.png" >
						</div>
						<div class = "phone"></div>
							PHONE<br>
							604-721-9337
					</div>
					<div class = "bot_right">

						<form action="contact.php" method = "post">
							<p class = "input_title">Your Name:</p><br><br>
							<input type="text" name="name"  class ="input_box">
							<br><span class = "error">*'.$nameErr.'</span>
							<br>
							<p class = "input_title">Email Address:</p><br>
							<input type="text" name="email"   class ="input_box"><br>
							<span class = "error"> * '.$emailErr.'</span>
							<br>
							<p class = "input_title">Message:</p><br>
							<textarea class ="comment_box"  name="comment"  ></textarea>
              <br>
              <span class = "error"> * '.$commentErr.'</span>

							<br><br>
							<input class ="send" type="submit" value="Send">
						</form>
					</div>
				</div>
			</div>';
style();
printHeader();
printcontent($var1,$active,5);
printFooter();
if ($name != "" and $email!= "" and $emailErr != "Invalid email format" and $comment !=""){
  $J_decode=array();

if(file_exists("contact_information.json") == TRUE){
    $myfile = fopen("contact_information.json","r") or die( "cant open the file!");
    $test2 = fread($myfile,filesize("contact_information.json"));
    $J_decode = json_decode($test2,true);
    fclose($myfile);
  }


  $temp = array("Name"=>$name, "email"=>$email,"comment"=>$comment);
  $J_decode[count($J_decode)+1] = $temp;
  $myfile = fopen("contact_information.json","w") or die( "cant open the file!");
  $outcome = json_encode($J_decode) ;
  fwrite($myfile ,$outcome);
  fclose($myfile);

  }

?>
