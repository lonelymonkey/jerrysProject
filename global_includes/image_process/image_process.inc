<?php
if (!class_exists('createimage')) {
// include ("db_helper.inc");

// require_once "data_validation.inc";


  class createimage {
    public $image = "";
    private $type = "";
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
    public function scale_gray ($file_name){

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
      // var_dump($image);
      imagefilter($image, IMG_FILTER_GRAYSCALE);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function brightness ($file_name){

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
      // var_dump($image);
      imagefilter($image, IMG_FILTER_BRIGHTNESS, -100);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function contrast ($file_name){

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
      // var_dump($image);
      imagefilter($image, IMG_FILTER_CONTRAST, -70);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function smooth ($file_name){

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
      // var_dump($image);
      // echo "smooth";
      imagefilter($image, IMG_FILTER_SMOOTH, -1);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
      return $base64;

    }
    public function blur ($file_name){

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
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

      $path = file_path.$file_name;
      // echo $path;
      $image = $this->saperate_type($path);
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

      $path = file_path.$file_name;
      $image = $this->saperate_type($path);
      ob_start(); // Let's start output buffering.
        imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
        $contents = ob_get_contents(); //Instead, output above is saved to $contents
      ob_end_clean(); //End the output buffer.
      $base64 = 'data:image/' . $type . ';base64,' . base64_encode($contents);
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
