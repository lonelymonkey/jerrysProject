<?php
//include "../../includes/global.inc";
include "../../../global_includes/image_process/image_process.inc";
include '../../../global_includes/image_process/config.inc';
// include INCLUDE_PATH . '/db_helper.inc';
include INCLUDE_PATH . '/clean_files.inc';

//include '../includes/import.inc';

//include INCLUDE_PATH."/dataService.inc";
$response = array(
    'status' => 1
);
try {
    //r1Exception::requireLogin();
    // var_dump($_FILES);

    if (!empty($_POST['function'])) {
      $service = new createimage();
      $data = array();
      if (!empty($_POST['data'])){
        $data = json_decode($_POST['data'],true);
      }

      $response['data'] = $service->{$_POST['function']}($data);
    } else if (!empty($_GET['function'])) {
      // $service = new dataServiceRead();
      // $data = array();
      // if (!empty($_GET['data'])) $data = json_decode($_GET['data'],true);
      // $response['data'] = $service->{$_GET['function']}($data);
    } elseif (!empty($_FILES)) {
        // var_dump($_FILES);
        if ( 0 < $_FILES['file']['error'] ) {
            echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        }
        else {
            $dir_process = new clean_files();
            $dir_process->clean_dir();
            $name = $dir_process->store_record($_FILES["file"]["type"]);
            if ($_FILES["file"]["type"] == "image/png") {
              move_uploaded_file($_FILES['file']['tmp_name'], file_path. $name .".png");
              $response["file_name"] = $name .".png";
              $response["url"] = $_SERVER['SERVER_NAME'].public_path.$name .".png";
            }elseif ($_FILES["file"]["type"] == "image/jpeg") {
              move_uploaded_file($_FILES['file']['tmp_name'], file_path. $name .".jpeg");
              $response["file_name"] = $name .".jpeg";
              $response["url"] = $_SERVER['SERVER_NAME'].public_path.$name .".jpeg";

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
        $response['errMsg'] = "Err : some tables are blank";
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
