<?php


function printHeader() {
  echo <<<EOB
  
  <div class="header">
		<div  class="container">

			<div class="left_col">
				<div class="head_title">ZIZURZ</div>
				</div>
			<div class="right_col" style="">
				<ul class="nav">
					<li><a class = "menutab" href = "/php hair/index.php"> HOME </a></li>
					<li><a class = "menutab" href ="/php hair/about.php"> ABOUT </a></li>
					<li><a class = "menutab" href ="/php hair/hair.php"> HAIRSTYLE </a></li>
					<li><a class = "menutab" href ="/php hair/news.php"> NEWS</a></li>
					<li><a class = "menutab" href ="/php hair/contact.php"> CONTACT </a></li>
				</ul>

			</div>
		</div>
	</div>
EOB;
}
function printFooter() {
echo <<<EOB
<div class="footer">
			<div class = "bot_container">
				<div class= "copyright">
					copyright 2023 @ zizurz | all rights reserved
				</div>
				<div class = "right_part">
					<ul class = "icons">
						<li><img src="/hairstyle/images/icons/pinterest.png"></li>
						<li><img src="/hairstyle/images/icons/googleplus-hover.png"></li>
						<li><img src="/hairstyle/images/icons/icon-facebook-hover.png"></li>
						<li><img src="/hairstyle/images/icons/icon-twitter2.png"></li>
					</ul>
				</div>
			</div>
	</div>
EOB;
}
?>