<?php

include '../../global_includes/includes/global_v2.inc';


$database = new Database();
$DataId = $_GET['val'] ;

$database->query('SELECT * FROM user_blog where id = '.$DataId.'');
$output_from_database = $database->resultset();
$Comment_ID = $output_from_database[0];

$content = '<div class = "right">
              <div class = "Full_comment_title">
              Review Full Comment From our users
              </div>
              <div class = "display">
                <div class = "full_comment_user">
                  Name : '.$Comment_ID["name"].'
                </div>
                <div class = "full_comment_comment">
                  Comment : <br><br><br>'.$Comment_ID["msg"].'
                </div>

              </div>

			       </div>';
$totalview = new myTemplate($content,3);

echo $totalview->getView();
//echo $totalview->right;




?>
