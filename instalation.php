<?php
include 'includes/JerryDatabass.class.inc';
include 'includes/config.inc';
$database = new Database();




$database->query("CREATE DATABASE instal_practice");
$database->execute();
$database->query("use instal_practice");
$database->execute();
$database->query("CREATE TABLE `lets check` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(64) NOT NULL,
  `email`varchar(64) NOT NULL,
  `msg` text NOT NULL,
  `rate` int(10) NOT NULL,
  `gender`varchar(64) NOT NULL,
  PRIMARY KEY  (`id`),
  KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1");
$database->execute();



 ?>
