<?php
use Jaguar\Canvas,
        Jaguar\CanvasInterface,
        Jaguar\Action\AbstractAction,
        Jaguar\Action\EdgeDetection,
        Jaguar\Action\Color\Negate,
        Jaguar\Action\Color\Grayscale,
        Jaguar\Dimension,
        Jaguar\Action\Preset\Dreamy,

        Jaguar\Color\RGBColor,
        Jaguar\Box,
        Jaguar\Action\BoxAction,
        Jaguar\Coordinate,
        Jaguar\Transformation;

require_once 'effect_lib.inc';
ini_set('memory_limit', '256M');
if (!class_exists('createimage')) {
// include ("db_helper.inc");
require_once ("JerryDatabase.class.inc");

// require_once "data_validation.inc";


  class createimage {
    public $image = "";
    private $type = "";
    public $small_image = [];
    private $size_flag = false;
    public $file_type;
    private $db;
    // public $effect_applied = ["id"=>'','url'=>'',"type"=>''];
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
      $small_image["filter"]["scale_gray"] = $this->scale_gray ($file_name);
      $small_image["filter"]["smooth"] = $this->smooth ($file_name);
      $small_image["filter"]["sharp"] = $this->sharp ($file_name);
      $small_image["filter"]["pixelate"] = $this->pixelate ($file_name);
      $small_image["filter"]["brightness"] = $this->brightness ($file_name);
      $small_image["filter"]["scale_green"] = $this->scale_green ($file_name);
      $small_image["filter"]["scale_blue"] = $this->scale_blue ($file_name);
      $small_image["filter"]["dawn"] = $this->dawn ($file_name);
      $small_image["filter"]["sepia"] = $this->sepia ($file_name);
      $small_image["filter"]["negative_smoke"] = $this->negative_smoke ($file_name);
      $small_image["filter"]["magic_pad"] = $this->magic_pad ($file_name);
      $small_image["filter"]["fantasy"] = $this->fantasy ($file_name);
      $small_image["filter"]["scratch"] = $this->scratch ($file_name);
      $small_image["filter"]["old_school"] = $this->old_school ($file_name);
      $small_image["filter"]["Vintage"] = $this->Vintage ($file_name);
      $small_image["filter"]["Vintage_beam"] = $this->Vintage_beam ($file_name);
      $small_image["filter"]["Canvas"] = $this->Canvas ($file_name);
      $small_image["filter"]["velvet"] = $this->velvet ($file_name);





      //
      //
      //
      //
      //
      //
      //
      $small_image["paint"]["cartoon"] = $this->cartoon ($file_name);
      $small_image["paint"]["contrast"] = $this->contrast ($file_name);
      $small_image["paint"]["Brush"] = $this->contrast ($file_name);

      //
      $small_image["sketch"]["sketch"] = $this->sketch ($file_name);
      $small_image["sketch"]["pencil"] = $this->pencil ($file_name);
      $small_image["sketch"]["coal_draw"] = $this->coal_draw ($file_name);

      $small_image["box"]["2X2"]["demo"] = $this->demo_twoXtwo ($file_name);
      $small_image["box"]["3X3"]["demo"] = $this->demo_3X3 ($file_name);
      // $small_image["box"]["4X4"]["demo"] = $this->coal_draw ($file_name);


      // $small_image["sketch"]["pencil_gray"] = $this->pencil_gray ($file_name);


      $this->size_flag = false;

      return $small_image;


    }
    public function demo_twoXtwo ($file_name){
        $effect = new Grayscale();
        $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
        if ($this->size_flag) {
          ob_start(); // Let's start output buffering.
            $canvas = new Canvas(file_path.$file_name);
            $w = $canvas->getWidth();
            $h = $canvas->getHeight();

            $box1 = new Box(
                  new Dimension($w / 2, $h / 2)
                  , new Coordinate(0, 0)
            );
            $box2 = new Box(
                            new Dimension($w / 2, $h / 2)
                            , new Coordinate($w / 2, $h / 2)
            );
            $transformation = new Transformation($canvas);
            $transformation ->apply(new BoxAction($effect, $box1))
                            ->apply(new BoxAction($effect, $box2))
                            ->resize(new Dimension(176,140))
                            ->getCanvas()
                            ->show();
            $contents = ob_get_contents(); //Instead, output above is saved to $contents
          ob_end_clean(); //End the output buffer.
          $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
          return $base64;
        }else {
          $new_img_name = $this->effect_img_store($file_name);
          $canvas = new Canvas(file_path.$file_name);
          $w = $canvas->getWidth();
          $h = $canvas->getHeight();

          $box1 = new Box(
                new Dimension($w / 2, $h / 2)
                , new Coordinate(0, 0)
          );
          $box2 = new Box(
                          new Dimension($w / 2, $h / 2)
                          , new Coordinate($w / 2, $h / 2)
          );
          $transformation = new Transformation($canvas);
          $transformation ->apply(new BoxAction(new Grayscale(), $box1))
                          ->apply(new BoxAction(new Grayscale(), $box2))
                          ->getCanvas()
                          ->save(file_path.$new_img_name.'.'.$this->type);
          // $this->store_photo_with_effect($new_img_name,$image);
          $effect_applied['id'] = $new_img_name;
          $effect_applied['type'] = $this->type;
          $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
          return $effect_applied;
        }
    }
    public function demo_3X3 ($file_name){
      $image = $this->get_image($file_name);
      $effect = new Grayscale();

        // $canvas->save('rename.jpeg');
        if ($this->size_flag) {
          ob_start(); // Let's start output buffering.
            $canvas = new Canvas(file_path.$file_name);
            $w = $canvas->getWidth();
            $h = $canvas->getHeight();

            $box1 = new Box(
                  new Dimension($w / 3, $h / 3)
                  , new Coordinate(0, 0)
            );
            $box2 = new Box(
                            new Dimension($w / 3, $h / 3)
                            , new Coordinate($w * (2/3), 0)
            );
            $box3 = new Box(
                            new Dimension($w / 3, $h / 3)
                            , new Coordinate($w * (1/3), $h * (1/3))
            );
            $box4 = new Box(
                            new Dimension($w / 3, $h / 3)
                            , new Coordinate(0, $h * (2/3))
            );
            $box5 = new Box(
                            new Dimension($w / 3, $h / 3)
                            , new Coordinate($w * (2/3), $h * (2/3))
            );
            $transformation = new Transformation($canvas);
            $transformation ->apply(new BoxAction($effect, $box1))
                            ->apply(new BoxAction($effect, $box2))
                            ->apply(new BoxAction($effect, $box3))
                            ->apply(new BoxAction($effect, $box4))
                            ->apply(new BoxAction($effect, $box5))
                            ->resize(new Dimension(176,140))
                            ->getCanvas()
                            ->show();
            $contents = ob_get_contents(); //Instead, output above is saved to $contents
          ob_end_clean(); //End the output buffer.
          $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
          return $base64;
        }else {
          $new_img_name = $this->effect_img_store($file_name);
          $canvas = new Canvas(file_path.$file_name);
          $w = $canvas->getWidth();
          $h = $canvas->getHeight();

          $box1 = new Box(
                new Dimension($w / 3, $h / 3)
                , new Coordinate(0, 0)
          );
          $box2 = new Box(
                          new Dimension($w / 3, $h / 3)
                          , new Coordinate($w * (2/3), 0)
          );
          $box3 = new Box(
                          new Dimension($w / 3, $h / 3)
                          , new Coordinate($w * (1/3), $h * (1/3))
          );
          $box4 = new Box(
                          new Dimension($w / 3, $h / 3)
                          , new Coordinate(0, $h * (2/3))
          );
          $box5 = new Box(
                          new Dimension($w / 3, $h / 3)
                          , new Coordinate($w * (2/3), $h * (2/3))
          );
          $transformation = new Transformation($canvas);
          $transformation ->apply(new BoxAction(new Grayscale(), $box1))
                          ->apply(new BoxAction(new Grayscale(), $box2))
                          ->apply(new BoxAction(new Grayscale(), $box3))
                          ->apply(new BoxAction(new Grayscale(), $box4))
                          ->apply(new BoxAction(new Grayscale(), $box5))
                          ->getCanvas()
                          ->save(file_path.$new_img_name.'.'.$this->type);
          // $this->store_photo_with_effect($new_img_name,$image);
          $effect_applied['id'] = $new_img_name;
          $effect_applied['type'] = $this->type;
          $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
          return $effect_applied;
        }


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
      $percent = 0.4;

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
    public function old_school ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new scratch_effect())
                          ->apply(new sepia_style())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new scratch_effect())
                        ->apply(new sepia_style())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function Vintage ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new Vintage_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new Vintage_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function velvet ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new velvet_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new velvet_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function Canvas ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new canvas_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new canvas_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function Vintage_beam ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new Vintage_beam_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new Vintage_beam_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function cartoon ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new paint_enhance())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new paint_enhance())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function Brush ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new paint_sharp())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new paint_sharp())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function fantasy ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation ->resize(new Dimension(176,140))
                          ->apply(new Dreamy_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new Dreamy_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;

        return $effect_applied;
      }
    }
    public function scratch ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new scratch_effect())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new scratch_effect())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function coal_draw ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new pencil_gray())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new pencil_gray())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function pencil3 ($file_name){
      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->apply(new color_sketch())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new color_sketch())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function pencil ($file_name){

      $image = $this->get_image($file_name);

        // $canvas->save('rename.jpeg');
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          $canvas = new Canvas(file_path.$file_name);
          $transformation = new Transformation($canvas);
          $transformation->resize(new Dimension(176,140))
                          ->apply(new PencilAction())
                          ->getCanvas()
                          ->show();
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $canvas = new Canvas(file_path.$file_name);
        $transformation = new Transformation($canvas);
        $image = $transformation->apply(new PencilAction())
                        ->getCanvas()
                        ->save(file_path.$new_img_name.'.'.$this->type);
        // $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }


    }
    public function sepia($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image,IMG_FILTER_GRAYSCALE);
      imagefilter($image,IMG_FILTER_BRIGHTNESS,-30);
      imagefilter($image,IMG_FILTER_COLORIZE, 90, 55, 30);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);
        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function master_sketch($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_CONTRAST, -70);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function sketch($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function magic_pad($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      imagefilter($image,IMG_FILTER_COLORIZE, 90, 55, 30);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function negative_smoke($file_name){
      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_NEGATE);
      imagefilter($image,IMG_FILTER_GRAYSCALE);
      imagefilter($image, IMG_FILTER_MEAN_REMOVAL);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function scale_gray ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_GRAYSCALE);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function scale_green ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,0, 255, 0);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function scale_blue ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,0, 0, 255);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function dawn ($file_name){

      // $path = file_path.$file_name;
      // echo $path;
      $image = $this->get_image($file_name);


      imagefilter($image, IMG_FILTER_COLORIZE,213, 123, 200);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function brightness ($file_name){
      $image = $this->get_image($file_name);

      // var_dump($image);

      imagefilter($image, IMG_FILTER_BRIGHTNESS, 100);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function contrast ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);

      imagefilter($image, IMG_FILTER_CONTRAST, -70);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function smooth ($file_name,$level = 1){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_SMOOTH, $level);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function sharp ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_SMOOTH, -9);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function blur ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_GAUSSIAN_BLUR);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }

    }
    public function pixelate ($file_name){

      $image = $this->get_image($file_name);

      // var_dump($image);
      // echo "smooth";

      imagefilter($image, IMG_FILTER_PIXELATE, 10, true);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        $effect_applied['id'] = $new_img_name;
        $effect_applied['type'] = $this->type;
        $effect_applied["url"] = public_path.$new_img_name.".".$this->type;
        return $effect_applied;
      }
    }
    public function original ($file_name){

      $image = $this->get_image($file_name);
      if ($this->size_flag) {
        ob_start(); // Let's start output buffering.
          imagejpeg($image); //This will normally output the image, but because of ob_start(), it won't.
          $contents = ob_get_contents(); //Instead, output above is saved to $contents
        ob_end_clean(); //End the output buffer.
        $base64 = 'data:image/' . $this->type . ';base64,' . base64_encode($contents);
        return $base64;
      }else {
        $new_img_name = $this->effect_img_store($file_name);

        $this->store_photo_with_effect($new_img_name,$image);
        return $new_img_name;
      }

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
