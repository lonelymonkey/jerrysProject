<?php
  function style(){
	   echo '<link href="css/style_common.css" rel="stylesheet">';
   }
  function printHeader() {
  echo <<<EOB
  <div class="header">
    <div  class="container">

    <div class="left_col">
        <div class="head_title">ZIZURZ</div>
    </div>
    <div class="right_col" style="">
    <ul class="nav">
      <li><a class = "menutab" href = "/hairstyle/index.html"> HOME </a></li>
      <li><a class = "menutab" href ="/hairstyle/About.html"> ABOUT </a></li>
      <li><a class = "menutab" href ="/hairstyle/Hairstyle.html"> HAIRSTYLE </a></li>
      <li><a class = "menutab" href ="/hairstyle/News.html"> NEWS</a></li>
      <li><a class = "menutab" href ="/hairstyle/Contact.html"> CONTACT </a></li>
    </ul>

  </div>
    </div>
  </div

EOB;
}
  function printcontent($content){
    $content;
  }

?>
