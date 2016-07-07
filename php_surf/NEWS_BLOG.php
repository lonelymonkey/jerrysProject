<?php

include '../includes/surf_global.inc';
$active = 'class = "active"';
$first["Name"] = $first["comment"]=$Second["Name"] = $Second["comment"] = $Third["Name"] = $Third["comment"] = "";
if(file_exists("blog.json") == TRUE){

$blogs = json_decode(file_get_contents('blog.json'),true);

$first= $blogs[count($blogs)];
if (count($blogs) > 2){
	$Second= $blogs[count($blogs)-1];
}
if (count($blogs)>1){
	$Third= $blogs[count($blogs)-2];
}


}
$blog_para[0] = print_blog($first["Name"],$first["comment"]);
$blog_para[1] = print_blog($Second["Name"],$Second["comment"]);
$blog_para[2] = print_blog($Third["Name"],$Third["comment"]);


$var1 ='<div class = "right">
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
style();
printHeader();
printcontent($var1,$active,3);
printFooter();
?>
