<?php
//include "../../includes/global.inc";
include "../includes/dataService.inc";
include '../includes/config.inc';
include INCLUDE_PATH . '/JerryDatabase.class.inc';

//include '../includes/import.inc';

//include INCLUDE_PATH."/dataService.inc";
$response = array(
    'status' => 1
);
try {
    //r1Exception::requireLogin();

    if (!empty($_POST['function'])) {
      $service = new dataServiceWrite();
      $data = array();

      if (!empty($_POST['data'])){
        $data = json_decode($_POST['data'],true);
        // var_dump($data);
      }
      $response['data'] = $service->{$_POST['function']}($data);
    } else if (!empty($_GET['function'])) {
      $service = new dataServiceRead();
      $data = array();
      if (!empty($_GET['data'])) $data = json_decode($_GET['data'],true);
      $response['data'] = $service->{$_GET['function']}($data);
    }
} catch (Exception $e) {
    //echo 'Caught exception: ' .  $e->getMessage() ;
    //allow overwrite on status for different level of errorDisplay
    if ($response['status'] >= 1) {
      $response['status'] = -1;
    }
    $response['errMsg'] = $e->getMessage();
}
//var_dump(json_encode($response['data']));
echo json_encode($response);

?>
