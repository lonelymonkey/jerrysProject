<?php

include '../includes/global_v2.inc';
$nameErr = $emailErr = $commentErr ="";
$name = $email = $comment = $rate = $gender =  "";
$ValidandStore = new function_surf();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = $ValidandStore->test_input($_POST["name"]);

  }

  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  }

  else {
    $email =  $ValidandStore->test_input($_POST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }
    $_POST["comment"] = trim($_POST["comment"]);
  if (empty($_POST["comment"])) {
    $commentErr = "No Comment submitted";
  } else {
    $comment =  $ValidandStore->test_input($_POST["comment"]);
  }
  if (empty($_POST["rate"])) {
    $rate = "no rating";
  } else {
    $rate =  $ValidandStore->test_input($_POST["rate"]);
  }
  if (empty($_POST["gender"])) {
    $gender = "Not specific";
  } else {
    $gender =  $ValidandStore->test_input($_POST["gender"]);
  }
}
$content  ='<div class="right">
  				<div class="Experience_title">
              		I hold a title
                </div>
              	<div class="Experience_content">
                <div class = "Experience_subtitle">
                   Please Leave your Email, Name, and Experience of Our Service. We appriciate it
                </div>
                <form action="experiences_sharing.php" method = "post">
    							<p class = "input_title">Your Name:</p><br>
    							<input type="text" name="name" class ="input_box">
                  <br>
    							<span class = "error">*'. $nameErr.'</span>
    							<br>
    							<p class = "input_title">Email Address:</p><br>
    							<input type="text" name="email" class ="input_box">
                  <br>
    							<span class = "error"> *'. $emailErr.'</span>
    							<br>
    							<p class = "input_title">Message:</p><br>
                  <p class = "input_title">Gender:</p>
                  <input type="radio" name="gender" value="female"><span class = "gender">Female
                  <input type="radio" name="gender" value="male"><span class = "gender">Male
                  <br><br>
                  <p class = "input_title">Rating:</p>
                  <input type="radio" name="rate" value="1"><span class = "rating">*
                  <input type="radio" name="rate" value="2"><span class = "rating">**
                  <input type="radio" name="rate" value="3"><span class = "ratingr">***
                  <input type="radio" name="rate" value="4"><span class = "rating">****
                  <input type="radio" name="rate" value="5"><span class = "rating">*****
                  <br><br>
                  <p class = "input_title">comment and Suggestion:</p>
                  <br>
                  <textarea class ="comment_box"  name="comment"  ></textarea>  <br>
                  <span class = "error"> *'. $commentErr.'</span>
    							<br><br>

    							<input class ="send" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';
$totalview = new myTemplate($content,6);

echo $totalview->getView();
if ($name != "" and $email!= "" and $emailErr != "Invalid email format"){

  //public function store_file($filename,$name,$comment,$email,$gender,$rating)
  $ValidandStore->experience($name,$comment,$email,$gender,$rate);
  }
//echo $totalview->right;




?>
