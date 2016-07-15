<?php


include '../includes/global_v2.inc';
$nameErr = $emailErr = $commentErr ="";
$name = $email = $comment = $rate = $gender =  "";
$ValidandStore = new function_surf();
if (!empty($_POST["submit"])) {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = $ValidandStore->test_input($_POST["name"]);

  }
    $_POST["comment"] = trim($_POST["comment"]);
  if (empty($_POST["comment"])) {
    $commentErr = "No Comment submitted";
  } else {
    $comment = $ValidandStore->test_input($_POST["comment"]);
  }

}
//public function store_file($filename,$name,$comment,$email,$gender,$rating)
if ($name != "" and $comment!= "" ){
  $ValidandStore->user_blog($name,$comment);
  }

$content  ='<div class="right">
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

    							<input class ="send" name = "submit" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';
$totalview = new myTemplate($content,7);

echo $totalview->getView();




?>
