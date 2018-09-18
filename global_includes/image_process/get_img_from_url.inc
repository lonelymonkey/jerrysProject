<?php
/**
 *
 */
class get_img_from_url
{
  private $type = "";
  private $dir_file;
  public function __construct()
  {
      $this->dir_file = new clean_files();
  }
  public function get_img_online ($url){
    // $img_online = file_get_contents($url);
    // $url = "https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    // $test = 'http://jerry_project.local/image_process/html/index.html';
    $url_info = pathinfo($url);
    if (!isset($url_info["extension"])) {
      throw new Exception(0);
    }
    $name = "";
    if ($this->parse_extension($url_info["extension"])) {
      $this->dir_file->clean_dir();
      $name = $this->dir_file->store_record($this->type);
      $img = file_path. $name .".".$this->type;
      // var_dump(file_get_contents($url));
      file_put_contents($img,file_get_contents($url));
      if (filesize($img)>2100000) {
        unlink($img);
        throw new Exception(1);
      }else {
        return $name . "." .$this->type;

      }
    }else {
      throw new Exception(0);
    }

  }
  private function parse_extension($extension){
    if (strpos($extension,'jpg')!== false) {
      $this->type = 'jpg';
      return true;
    }
    if (strpos($extension,'jpeg')!== false) {
      $this->type = 'jpeg';
      return true;
    }
    if (strpos($extension,'png')!== false) {
      $this->type = 'png';
      return true;
    }
    return false;
  }
}


 ?>
