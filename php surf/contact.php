<?php

include '../includes/surf_global.inc';
$active = 'class = "active"';
$var1 ='<div class = "right">
				<div class = "contact_top">
					<div class = "title">
						we want to here from you!
					</div>
					<div class = "sub_title">
						FREE WEBSITE TEMPLATES
					</div>
					<div class ="para">
						I hold some information here
					</div>
				</div>
				<div class = "contact_bot">
					<div class = "bot_left">
						<div class = "detail_title">
							CONTACT DETAILS
						</div>
						<div class = "location">
							LOCATION <br>
							This is just a place holder, so you can see what the site would look like
						</div>
						<div class = "separate_line">
							<img class = "image" src = "images/Contact/contact.png" >
						</div>
						<div class = "Email">
							EMAIL
							<p class = "email">
								zoj3zoj3@gmail
							</p>
						</div>
						<div class = "separate_line">
							<img class = "image" src = "images/Contact/contact.png" >
						</div>
						<div class = "phone"></div>
							PHONE<br>
							604-721-9337
					</div>
					<div class = "bot_right">

						<form action="action_page.php">
							<p class = "input_title">Your Name:</p><br>
							<input type="text" name="firstname" size ="48">
							<br>
							<p class = "input_title">Email Address:</p><br>
							<input type="text" name="email" size ="48">
							<br>
							<p class = "input_title">Message:</p><br>
							<textarea class ="message"  rows = "10" cols = "49" name="message" size ="48">
							</textarea>
							<br><br>
							<input class ="send" type="submit" value="Send">
						</form>
					</div>
				</div>
			</div>';
style();
printHeader();
printcontent($var1,$active,5);
printFooter();
?>
