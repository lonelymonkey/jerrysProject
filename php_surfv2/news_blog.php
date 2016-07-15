<?php

include '../includes/global_v2.inc';

$first["name"] = $Second["name"] = $Third["name"] = "No one leave the message";
$first["msg"]=  $Second["msg"] = $Third["msg"] ="No comment";

$database = new Database();
$database->query('SELECT * FROM user_blog ORDER BY id DESC LIMIT 3');

$output_from_database = $database->resultset();


if(count($output_from_database)>0){
$first = $output_from_database[0];

}
if (count($output_from_database) >=2){
	$Second = $output_from_database[1];
}
if (count($output_from_database)>=3){
	$Third= $output_from_database[2];
}
$trim_first_msg = substr($first["msg"], 0,20);
$trim_second_msg = substr($Second["msg"], 0,20);
$trim_third_msg = substr($Third["msg"], 0,20);






$GetBlog = new function_surf();
$blog_para[0] = $GetBlog->print_blog($first["name"],$trim_first_msg,$first["id"]);
$blog_para[1] = $GetBlog->print_blog($Second["name"],$trim_second_msg,$Second["id"]);
$blog_para[2] = $GetBlog->print_blog($Third["name"],$trim_third_msg,$Third["id"]);


$content ='<div class = "right">
					<div class ="blog_top">
						'.$blog_para[0].'
						'.$blog_para[1].'
						'.$blog_para[2].'
				<div class =<"blog_bot">
					<div class = "blog_further_info">
						<div class = "blog_title">
							RECENT POST
						</div>
						<div class = "further_para">
							This is a place holder, so you can see what the side would look like
						</div>

					</div>
					<div class = "blog_further_info">
						<div class = "blog_title">
							RECENT POST
						</div>
						<div class = "further_para">
							This is a place holder, so you can see what the side would look like
						</div>

					</div>
					<div class = "blog_further_info">
						<div class = "blog_title">
							RECENT POST
						</div>
						<div class = "further_para">
							This is a place holder, so you can see what the side would look like
						</div>

					</div>
				</div>
				</div>
			</div>';
$totalview = new myTemplate($content,3);
echo $totalview->getView();
?>
