<?php


include '../includes/global_v2.inc';

$first["Name"] = $Second["Name"] = $Second["comment"] = $Third["Name"] = "No one leave the message";
$first["comment"]= $Second["comment"] =  $Third["comment"] ="No comment";

if(file_exists("blog.json") == TRUE){

$blogs = json_decode(file_get_contents('blog.json'),true);

$first= $blogs[count($blogs)];
if (count($blogs) >= 2){
	$Second= $blogs[count($blogs)-1];
}
if (count($blogs)>=1){
	$Third= $blogs[count($blogs)-2];
}


}
$GetBlog = new function_surf();
$blog_para[0] = $GetBlog->print_blog($first["Name"],$first["comment"]);
$blog_para[1] = $GetBlog->print_blog($Second["Name"],$Second["comment"]);
$blog_para[2] = $GetBlog->print_blog($Third["Name"],$Third["comment"]);


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
