<?php
$key = "RGAPI-ABAD7339-033C-4B8A-9ECE-D80934EB2509";
$tempoutput[0] = file_get_contents('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/epicdeathrider?api_key='.$key);
$tempoutput[1] = file_get_contents('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key='.$key);
$result = json_decode($tempoutput[1]);

if (!empty($_POST["submit"])) {
  $Champion = $_POST["name"];
}

//https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?api_key=RGAPI-ABAD7339-033C-4B8A-9ECE-D80934EB2509


$content  ='<div class="right">
  				<div class="user_blog_title">
              		Write Your Blog
                </div>
              	<div class="Experience_content">

                <form action="index.php" method = "post">
    							<p class = "input_title">champion:</p><br>
    							<input type="text" name="name" class ="input_box">

    							<input class ="send" name = "submit" type="submit" value="Send">
    						</form>
              	</div>
  			</div>';

echo $content;


echo "<pre>";

var_dump($result->data->Jax);

echo "<br>";
//echo $tempoutput[1];

echo "</pre>";
 ?>
