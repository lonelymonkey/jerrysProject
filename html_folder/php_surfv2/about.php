<?php


include '../includes/global_v2.inc';

$content  ='<div class = "right">
				<div class ="about_top">
					<div class = "about_words">
						<div class = "title">
							We have free templates for everyone
						</div>
						<div class = "para">
							We have some information here
						</div>
					</div>
					<div class = "about_top_img">
						<img class = "image" src = "images/About/about_top.png" >
					</div>
				</div>

				<div class ="about_bot">
					<div class = "about_bot_img">
						<div class = "img">
							<img class = "image" src = "images/About/about_bot.png" >
						</div>
						<div class ="call_circle">
							<div class = "circle">
								<img class = "image" src = "images/About/about_circle.png" >
							</div>
							<div class = "call">
								Call<br> Now
							</div>

						</div>
					</div>
					<div class ="about_bot_words">
						<div class = "title" >
							We have more templates for you
						</div>
						<div class = "para">
							Looking for more templates? Just....................................
						</div>
						<div class = "sub_title">
							BE PART OF OUR COMMNUITY
						</div>
						<div class = "para">
							I have more information for you here
						</div>
						<div class = "sub_title">
							TEMPLATES DETAIL
						</div>
						<div class = "para">
							I have more information here
						</div>
					</div>
				</div>
			</div>';
$totalview = new myTemplate($content,4);

echo $totalview->getView();
//echo $totalview->right;

?>

?>
