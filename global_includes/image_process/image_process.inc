<?php
if (!class_exists('createimage')) {
// include ("db_helper.inc");
include ("JerryDatabase.class.inc");

// require_once "data_validation.inc";


  class createimage {
    public $image = "";
    private $type = "";
    public $small_image = [];
    private $size_flag = false;
    private $file_type;
    private $db;
    public function __construct() {
      $this->db = new Database();
    }

    private function saperate_type($file){

      $this->type = pathinfo($file, PATHINFO_EXTENSION);
      // var_dump($this->type);
      switch ($this->type) {
        case 'jpg':
          // var_dump($this->type);

          $image = imagecreatefromjpeg($file);
          $this->file_type = 'jpg';
          break;
        case 'jpeg':
          // var_dump($this->type);

          $image = imagecreatefromjpeg($file);
          $this->file_type = 'jpeg';

          break;
        case 'png':
          $image = imagecreatefrompng($file);
          $this->file_type = 'png';

          break;
        default:
          // code...
          break;
      }
      // var_dump($image);
      return $image;
    }
    public function preview_effect($file_name){
      $this->size_flag = true;
      $small_image["filter"]["original"] = $this->original ($file_name);
      $small_image["filter"]["scale_gray"] = $this->scale_gray ($file_name);
      $small_image["filter"]["smooth"] = $this->smooth ($file_name);
      $small_image["filter"]["sharp"] = $this->sharp ($file_name);
      $small_image["filter"]["pixelate"] = $this->original ($file_name);
      $small_image["filter"]["brightness"] = $this->original ($file_name);
      $small_image["filter"]["scale_green"] = $this->original ($file_name);
      $small_image["filter"]["scale_blue"] = $this->original ($file_name);
      $small_image["filter"]["dawn"] = $this->original ($file_name);
      $small_image["filter"]["sepia"] = $this->original ($file_name);
      $small_image["filter"]["negative_smoke"] = $this->original ($file_name);
      $small_image["filter"]["magic_pad"] = $this->original ($file_name);




      $small_image["paint"]["contrast"] = $this->contrast ($file_name);

      $small_image["sketch"]["sketch"] = $this->sketch ($file_name);
      $small_image["sketch"]["pencil"] = $this->pencil ($file_name);
      $small_image["sketch"]["coal_draw"] = $this->coal_draw ($file_name);

      $this->size_flag = false;

      return $small_image;


    }
    private function store_photo_with_effect ($file_name,$image){

      switch ($this->type) {
        case 'jpg':
          // var_dump($this->type);

          imagejpeg($image,file_path.$file_name.".jpg");
          break;
        case 'jpeg':
          // var_dump($this->type);

          imagejpeg($image,file_path.$file_name.".jpeg");


          break;
        case 'png':
          imagepng($image,file_path.$file_name.".png");

          break;
        default:
          // code...
          break;
      }
    }
    private function effect_img_store($file_name){
      $basename = basename($file_name,".".$this->file_type);
      $random_name = rand(1000000,9999999);
      $random_name = dechex($random_name);
      $this->db->query('INSERT INTO image_effect (original_photo_id, effect_photo_id, create_time) values (:original_photo_id,:effect_photo_id,:create_time)')
               ->bind(':original_photo_id',"$basename")
               ->bind(':effect_photo_id',$random_name)
               ->bind(":create_time",date("Y-m-d G:i:s",time()))
               ->execute();
      return $random_name;

    }
    private function get_image ($file_name){
      $path = file_path.$file_name;
      // echo $path;
      $percent = 0.2;

      if ($this->size_flag) {
        list($width, $height) = getimagesize($path);
        $newwidth = $width * $percent;
        $newheight = $height * $percent;
        $thumb = imagecreatetruecolor($newwidth, $newheight);
        $image = $this->saperate_type($path);
        imagecopyresized($thumb, $image, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
        return $thumb;
      }else {
        $image = $this->saperate_type($path);
        return $image;
      }
    }
    public function pencil ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";
      imagefilter($image,IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image, IMG_FILTER_EDGEDETECT);
      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
      $new_img_name = $this->effect_img_store($file_name);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $this->store_photo_with_effect($new_img_name,$image);
        return $new_img_name;
      }


    }
    public function sepia($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image,IMG_FILTER_GRAYSCALE);
      imagefilter($image,IMG_FILTER_BRIGHTNESS,-30);
      imagefilter($image,IMG_FILTER_COLORIZE, 90, 55, 30);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;
    }
    public function master_sketch($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_CONTRAST, -70);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;
    }
    public function sketch($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;
    }
    public function magic_pad($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      imagefilter($image,IMG_FILTER_COLORIZE, 90, 55, 30);

      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;
    }
    public function negative_smoke($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image,IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;
    }
    public function scale_gray ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function coal_draw ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);

      imagefilter($image, IMG_FILTER_SMOOTH, -8);

      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function scale_green ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,0, 255, 0);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function scale_blue ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,0, 0, 255);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function dawn ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,213, 123, 200);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function brightness ($file_name){
      $image = $this->get_image($file_name);

      // var_dump($image);

      imagefilter($image, IMG_FILTER_BRIGHTNESS, 100);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function contrast ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);

      imagefilter($image, IMG_FILTER_CONTRAST, -70);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function smooth ($file_name,$level = 1){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_SMOOTH, $level);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function sharp ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_SMOOTH, -9);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function blur ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function pixelate ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_PIXELATE, 10, true);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function original ($file_name){

      $image = $this->get_image($file_name);


      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

      //  the part below is working
      // $type = pathinfo($path, PATHINFO_EXTENSION);
      // $data = file_get_contents($path);
      // $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
      // return $base64;
      // $file_output = apply_effect("gray",$this->image,1);
      // return "test_output";
    }
  }
}
?>