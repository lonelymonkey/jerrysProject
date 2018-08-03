<?php

class myTemplate {
  public $right = '';
  public $number = 0;
  function __construct($content, $decide) {
    $this->right = $content;
    $this->number = $decide;
  }

  private function head() {
    $view = '';

    $view .= '<!DOCTYPE html><html>
              <head>
                  <link href="css/style.css" rel="stylesheet">
              </head>
            ';
    return $view;
  }
  public function getHeader() {
    $output =
    '  <div class = "header">
    		<div class ="container">
    			<img class = "image" src = "images/Common/title_image.png" >
    			<div class ="title">
    				Lumseko
    			</div>
    			<div class ="sub_title">
    				BEST SURFING SPOT
    			</div>
    		</div>
    	</div>';
    return $output;
  }
 public function printFooter() {
    $output = '  <div class = "footer">
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
    </div>';

      echo $output;
  }
  public function getMenu($right, $number) {
    $active1 = $active2 =$active3 =$active4 =$active5 = $active6 =$active7="";
    	$active = 'class = "active"';
  	if ($number == 1){
  		$active1 = $active ;
  	//	echo "first <br>";

  	}elseif($number == 2){
  		$active2 = $active;
  	//	echo "second <br>";

  	}elseif($number ==3){
  		$active3 = $active;
  	//	echo "third <br>";

  	}elseif($number == 4){
  		$active4 = $active;
  	//	echo "forth <br>";

  	}elseif($number== 5){
  	$active5 = $active;
  //	echo "fifth <br>";
  	}
  elseif($number == 6){
  		$active6 = $active;
  		//	echo "fifth <br>";
  }
  elseif($number == 7){
  		$active7 = $active;
  		//	echo "fifth <br>";
  }

    $output = '
    <div class = "content">
      <div class = "background">
      </div>
        <div class = "container">
        <div class ="containerBG">
        </div>
          <div class = "left">
            <ul class = "menu">
              <li '.$active1.'><a class = "menutab" href ="/html_folder/php_surfv2/index.php"> HOME </a></li>
              <li '.$active2.'><a class = "menutab" href ="/html_folder/php_surfv2/surf_base.php"> SURF BASE </a></li>
              <li '.$active3.'><a class = "menutab" href ="/html_folder/php_surfv2/news_blog.php"> NEWS & BLOG </a></li>
              <li '.$active4.'><a class = "menutab" href ="/html_folder/php_surfv2/about.php"> ABOUT </a></li>
              <li '.$active5.'><a class = "menutab" href ="/html_folder/php_surfv2/contact.php"> CONTACT </a></li>
              <li '.$active6.'><a class = "menutab" href ="/html_folder/php_surfv2/experiences_sharing.php"> Experience Sharing</a></li>
              <li '.$active7.'><a class = "menutab" href ="/html_folder/php_surfv2/user_blog.php"> Write Your Blogs</a></li>
            </ul>
          </div>
          '.$right.'
        </div>

      </div>
    ';

    return $output;
  }
  public function getFooter() {
    $output = '  <div class = "footer">
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
    </div>';
      return $output;
  }
  //new design
  public function getFooter_v2() {

  }
  public function printView(){
    $this->getView();
  }
  public function getView() {
    $view = '';
    $view .= $this->head();
    //body
    $view .=  $this->getHeader() ;
    $view .=  $this->getMenu($this->right,$this->number) ;

    $view .= $this->getFooter();
   echo $view;

  }


}
?>
