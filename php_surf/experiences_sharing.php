<?php

include '../includes/surf_global.inc';
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
}
$active = 'class = "active"';
$var1 ='<div class="right">
  				<div class="Experience_title">
              		I hold a title
                </div>
              	<div class="Experience_content">
                <div class = "Experience_subtitle">
                   Please Leave your Email, Name, and Experience of Our Service. We appriciate it
                </div>
                <form action="Experience Sharing.php" method = "post">
    							<p class = "input_title">Your Name:</p><br>
    							<input type="text" name="name" size ="48">
    							<span class = "error">*</span>
    							<br>
    							<p class = "input_title">Email Address:</p><br>
    							<input type="text" name="email" size ="48">
    							<span class = "error"> *</span>
    							<br>
    							<p class = "input_title">Message:</p><br>
    							<textarea class ="comment"  name="comment" rows = "10" cols = "49"  size ="48">
    							</textarea>
    							<br><br>
                  <p class = "input_title">Gender:</p>
                  <input type="radio" name="gender" value="female"><span class = "gender">Female
                  <input type="radio" name="gender" value="male"><span class = "gender">Male
                  <br><br>
    							<input class ="send" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';
style();
printHeader();
printcontent($var1,$active,6);
printFooter();
?>
