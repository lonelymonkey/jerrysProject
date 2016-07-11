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
function printcontent($msg,$decide) {
	$active = 'class = "active"';
	$active1 = $active2 =$active3 =$active4 =$active5 = $active6 =$active7="";

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
elseif($decide == 6){
		$active6 = $active;
		//	echo "fifth <br>";
}
elseif($decide == 7){
		$active7 = $active;
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
					<li $active1><a class = "menutab" href ="/php_surf/index.php"> HOME </a></li>
					<li $active2><a class = "menutab" href ="/php_surf/surf_base.php"> SURF BASE </a></li>
					<li $active3><a class = "menutab" href ="/php_surf/news_blog.php"> NEWS & BLOG </a></li>
					<li $active4><a class = "menutab" href ="/php_surf/about.php"> ABOUT </a></li>
					<li $active5><a class = "menutab" href ="/php_surf/contact.php"> CONTACT </a></li>
					<li $active6><a class = "menutab" href ="/php_surf/experiences_sharing.php"> Experience Sharing</a></li>
					<li $active7><a class = "menutab" href ="/php_surf/user_blog.php"> Write Your Blogs</a></li>
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
function print_blog($name,$comment){

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
function print_post($title,$content){
if ($title ==""){
		$title = "RECENT POST";

}
if ($content ==""){
	 $content = "No futher Detail";

}

$output = '<div class = "blog_further_info">
	<div class = "blog_title">
		'.$title.'
	</div>
	<div class = "further_para">
		'.$content.'
	</div>
';

return $output;
}

?>
