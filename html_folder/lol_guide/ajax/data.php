<?php
//include "../../includes/global.inc";
include "../../../global_includes/lol_guide/dataService.inc";
include '../../../global_includes/lol_guide/config.inc';
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
    switch ($e->getMessage()) {
      case '0':
      $response['errMsg'] = "Err : some tables are blank";
      $response['status'] = -2;
        break;
      case '2':
      $response['errMsg'] = "Err : talbe does not match the build or build does not match user";
      $response['status'] = -2;
        break;
      case '3':
      $response['errMsg'] = "Err : spell_set's data does not match format";
      $response['status'] = -2;
        break;
      case '4':
      $response['errMsg'] = "Err : rune_set's data does not match format";
      $response['status'] = -2;
        break;
      case '5':
      $response['errMsg'] = "Err : item set's data is wrong, item's data is not saved";
      $response['status'] = -2;
        break;
      case '6':
      $response['errMsg'] = "Err : Item set's name is empty";
      $response['status'] = -2;
        break;
      case '7':
      $response['errMsg'] = "Err : Limit of time of create build is 3 per day. You have reach the limit";
      $response['status'] = -2;
        break;
      default:
        $response['errMsg'] = "Something wrong with data you save, please try again";
        break;
    }
}
// var_dump(json_encode($response));
echo json_encode($response);

?>
