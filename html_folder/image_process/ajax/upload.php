<?php
    // if (!empty($_FILES)) {
    //   if
    //   if ( 0 < $_FILES['file']['error'] ) {
    //       echo 'Error: ' . $_FILES['file']['error'] . '<br>';
    //   }
    //   else {
    //       move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
    //   }
    // }else {
    //   echo "file is empty";
    // }

    $response = array(
        'status' => 1
    );
    try {
      if (!empty($_FILES)) {
        // echo "file is not emtyp";

        if ( 0 < $_FILES['file']['error'] ) {
            echo 'Error: ' . $_FILES['file']['error'] . '<br>';
        }
        else {
            move_uploaded_file($_FILES['file']['tmp_name'], '../uploads/' . $_FILES['file']['name']);
            $response["file_name"] = $_FILES['file']['name'];
        }
      }else {
        echo "file is empty";
      }
    } catch (Exception $e) {

    }
    // var_dump(json_encode($response));
    echo json_encode($response);
?>
