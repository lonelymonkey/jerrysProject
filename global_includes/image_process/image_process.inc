<?php
if (!class_exists('createimage')) {
// include ("db_helper.inc");

// require_once "data_validation.inc";


  class createimage {
    public $image = "";
    private $type = "";
    public $small_image = [];
    private $size_flag = false;
    public function __construct() {

    }

    private function saperate_type($file){

      $this->type = pathinfo($file, PATHINFO_EXTENSION);
      // var_dump($this->type);
      switch ($this->type) {
        case 'jpg':
          // var_dump($this->type);

          $image = imagecreatefromjpeg($file);
          break;
        case 'jpeg':
          // var_dump($this->type);

          $image = imagecreatefromjpeg($file);
          break;
        case 'png':
          $image = imagecreatefrompng($file);
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
      $small_image["original"] = $this->original ($file_name);
      $small_image["scale_gray"] = $this->scale_gray ($file_name);
      $small_image["smooth"] = $this->smooth ($file_name);
      $small_image["sharp"] = $this->sharp($file_name);
      $small_image["contrast"] = $this->contrast($file_name);
      $small_image["pixelate"] = $this->pixelate($file_name);
      $small_image["brightness"] = $this->brightness($file_name);
      $small_image["scale_green"] = $this->scale_green($file_name);
      $small_image["scale_blue"] = $this->scale_blue($file_name);
      $small_image["dawn"] = $this->dawn($file_name);

      $this->size_flag = false;

      return $small_image;


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
