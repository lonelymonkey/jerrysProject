<?php

function style(){
	echo '<link href="css/style_common.css" rel="stylesheet">';
}
function printHeader() {
  echo <<<EOB

  <div class = "header">
		<div class ="container">
			<img class = "image" src = "images/Common/title_image.png" >
			<div class ="title">
				Lumseko
			</div>
			<div class ="Sub_title">
				BEST SURFING SPOT
			</div>
		</div>
	</div>
EOB;
}


function printFooter() {
echo <<<EOB
<div class = "footer">
  <div class = "container">
    <div class = "footer_first">
      <div class ="NewsLetter">
        <div class = "title">
          NEWSLETTER <br>
          The latest sale is everything in the store is 20% off
        </div>

      </div>
    </div>
    <div class = "footer_second">
      <div class ="email_address">
        zoj3zoj3@gmail.com
      </div>
      <div class ="copyright">
        @copyright 2016 All rights reserved
      </div>
    </div>
    <div class = "footer_third">
      <div class ="title">
        social
      </div>

      <div class = "icon">
        <div class="Twitter_imgbox"></div>
        <div class="Google_imgbox"></div>
        <div class="Facebook_imgbox"></div>
      </div>

    </div>

  </div>
</div>
EOB;
}
function printcontent($msg, $active, $decide) {
	$active1 = $active2 =$active3 =$active4 =$active5 = "";

	if ($decide == 1){
		$active1 = $active ;
	//	echo "first <br>";

	}elseif($decide == 2){
		$active2 = $active;
	//	echo "second <br>";

	}elseif($decide ==3){
		$active3 = $active;
	//	echo "third <br>";

	}elseif($decide == 4){
		$active4 = $active;
	//	echo "forth <br>";

	}elseif($decide == 5){
	$active5 = $active;
//	echo "fifth <br>";

	}

echo <<<EOB
<div class = "content">
	<div class = "background">
	</div>
		<div class = "container">
		<div class ="containerBG">
		</div>
			<div class = "left">
				<ul class = "menu">
					<li $active1><a class = "menutab" href ="/php surf/index.php"> HOME </a></li>
					<li $active2><a class = "menutab" href ="/php surf/SURF_BASE.php"> SURF BASE </a></li>
					<li $active3><a class = "menutab" href ="/php surf/NEWS_BLOG.php"> NEWS & BLOG </a></li>
					<li $active4><a class = "menutab" href ="/php surf/ABOUT.php"> ABOUT </a></li>
					<li $active5><a class = "menutab" href ="/php surf/CONTACT.php"> CONTACT </a></li>
				</ul>
			</div>
			$msg
		</div>

	</div>
EOB;
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>
