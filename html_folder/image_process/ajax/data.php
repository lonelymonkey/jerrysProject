<?php
//include "../../includes/global.inc";
include "../../../global_includes/image_process/image_process.inc";
include '../../../global_includes/image_process/config.inc';
// include INCLUDE_PATH . '/db_helper.inc';
include INCLUDE_PATH . '/clean_files.inc';
include INCLUDE_PATH . '/get_img_from_url.inc';

//include '../includes/import.inc';

//include INCLUDE_PATH."/dataService.inc";
$response = array(
    'status' => 1
);
try {
    //r1Exception::requireLogin();
    // var_dump($_GET['function']);

    if (!empty($_POST['function'])) {
      $service = new createimage();
      $data = array();
      if (!empty($_POST['data'])){
        $data = json_decode($_POST['data'],true);
      }

      $response['data'] = $service->{$_POST['function']}($data);
    } else if (!empty($_GET['function'])) {
      $service = new get_img_from_url();

      $data = array();
      if (!empty($_GET['data'])) {
        $data = json_decode($_GET['data'],true);

      }
      // var_dump($data);
      $response["file_name"] = $service->{$_GET['function']}($data);
      $response["url"] = public_path.$response["file_name"];
    } elseif (!empty($_FILES)) {
        // var_dump($_FILES["file"]["type"]);
        if ( 0 < $_FILES['file']['error'] ) {
          throw new Exception(1);

        }elseif ($_FILES["file"]["type"] != "image/png" && $_FILES["file"]["type"] != "image/jpg" && $_FILES["file"]["type"] != "image/jpeg" ) {
          throw new Exception(0);
        }elseif ($_FILES["file"]["size"] > 2200000 ) {
          throw new Exception(1);
        }
        else {
          // var_dump($_FILES);

            $dir_process = new clean_files();
            $dir_process->clean_dir();
            $name = $dir_process->store_record($_FILES["file"]["type"]);
            if ($_FILES["file"]["type"] == "image/png") {
              move_uploaded_file($_FILES['file']['tmp_name'], file_path. $name .".png");
              $response["file_name"] = $name .".png";
              $response["url"] = public_path.$name .".png";
            }elseif ($_FILES["file"]["type"] == "image/jpeg") {
              move_uploaded_file($_FILES['file']['tmp_name'], file_path. $name .".jpeg");
              $response["file_name"] = $name .".jpeg";
              $response["url"] = public_path.$name .".jpeg";

            }

        }
    }
} catch (Exception $e) {
    //echo 'Caught exception: ' .  $e->getMessage() ;
    //allow overwrite on status for different level of errorDisplay
    if ($response['status'] >= 1) {
      $response['status'] = -1;
    }
    switch ($e->getMessage()) {
      case '0':
        $response['errMsg'] = "The app does not support this type of file. Please update Jpeg, Jpg, or png";
        $response['status'] = -2;
        break;
      case '1':
        $response['errMsg'] = "The file size may be too big, Please choose a differnt file";
        $response['status'] = -2;
        break;
      case '2':
        $response['errMsg'] = "The URL is too large";
        $response['status'] = -2;
        break;
      default:
        $response['errMsg'] = $e->getMessage();
        break;
    }
}
// var_dump(json_encode($response));
echo json_encode($response);

?>
