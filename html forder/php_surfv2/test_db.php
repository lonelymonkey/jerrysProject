<?php
include '../includes/global_v2.inc';

$myDB->query('insert into contact_us (name, email, msg) values("wayne", "wayne0709@hotmail.com", "hello world")')
      ->execute();

      $myDB->query('insert into contact_us (name, email, msg)
                        values( :name , :email, :msg)')
            ->bindAll(array(
                ':name' => $_POST['name'],
                ':email' => $_POST['email'],
                ':msg' => $_POST["message"]
              ))
            ->execute();
?>
