<?php

include '../includes/surf_global.inc';

$active = 'class = "active"';
$var1 ='<div class = "right">
				<div class = "home_first">
						<div class ="Home_title">
							BEST SURFING!
						</div>
					<div class = "Home_para">
						<p>This website provide the best surfing.
							The templates is free to use and can be changed freely.</p>
						</div>
					</div>
					<div class = "home_second">
						<div class = "Home_First_pic">
							<img src = "images/Home/Left.png">
						</div>
						<div class = "Home_Second_pic">
							<img src = "images/Home/right.png">
						</div>
						<div class = "Home_mid_circle">
							<img src = "images/Home/mid circle.png">
						</div>

						<a class ="go_to_SURF" href ="/tourismsurfing/SURF_BASE.html">
							GO TO <br>
							SURF BASE
						</a>
					</div>
					<div class = "home_third">
						<div class ="second_left">
							<div class = "Home_second_title">
								NEWS & BLOG
							</div>
							<div class ="Home_second_part_pic">
								<img src = "images/Home/news_blog.png">
							</div>

						</div>
						<div class ="second_right">
							<div class = "second_part">
								<div class = "Home_second_part_subtitle">
									This place has the latest information
								</div>
								<div class ="Home_second_part_para">
									We updates all or new information and our latest news
								</div>
							</div>
						</div>

					</div>

			</div>';
style();
printHeader();
printcontent($var1,$active,1);
printFooter();
?>
