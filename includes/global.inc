<?php

function printHeader($msg) {
  echo <<<EOB
  $msg
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
?>
