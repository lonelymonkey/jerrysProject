<?php

include '../includes/surf_global.inc';

$var1 ='<div class = "right">
					<div class ="surf_top">
					<div class = "surf_title">
						Surfer'."'".'s Paradise
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
			</div>';
style();
printHeader();
printcontent($var1,2);
printFooter();
?>
