<?php
function printcontent() {
	echo <<< EOB
	<div class = "content">
	<div class = "background">
		
	</div>
		<div class = "container">
		<div class ="containerBG">
		</div>
			<div class = "left">
				<ul class = "menu">
					<li><a class = "menutab" href ="/php surf/index.php"> HOME </a></li>
					<li><a class = "menutab" href ="/php surf/surf.php"> SURF BASE </a></li>
					<li><a class = "menutab" href ="/php surf/News.php"> NEWS & BLOG </a></li>
					<li><a class = "menutab" href ="/php surf/about.php"> ABOUT </a></li>
					<li><a class = "menutab" href ="/php surf/CONTACT.php"> CONTACT </a></li>
				</ul>
			</div>
			<div class = "right">
					<div class ="surf_top">
					<div class = "surf_title">
						Surfer's Paradise
					</div>
					<div class = "top_para">
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
						I hold some information here
					</div>
					<div class = "top_img">
						<img class = "image" src = "images/Surf Base/Top.png" >
					</div>
					<div class = "surf_mid_link">
						<div class = "go_to_blog_circle">
							<img class = "image" src = "images/Home/mid circle.png" >
						</div>
						<a class ="go_to_blog" href ="/tourismsurfing/NEWS_BLOG.html">
							GO TO <br>
							Blog
						</a>
					</div>
				</div>
				<div class ="surf_bot">
					<div class="mid_block">
						I am mid block, I hold some imformation
					</div>
					<ul class = "pics">
						<li><img class = "image" src = "images/Surf Base/bot_first.png" ></li>
						<li><img class = "image" src = "images/Surf Base/bot_second.png" ></li>
						<li><img class = "image" src = "images/Surf Base/bot_last.png" ></li>
					</ul>
					<div class="bot_para">
						 I hold some information
					</div>
				</div>
			</div>				
		</div>
		
	</div>
EOB;
}
?>