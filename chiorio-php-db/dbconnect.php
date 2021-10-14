<?php 

require 'rb.php';

$HOST = 'localhost';
$DB_NAME = 'chiorio';
$USER = 'root';
$PASSWORD = '';
// $USER = 'voronin';
// $PASSWORD = '0Q1d6N6e';

R::setup("mysql:host=$HOST;dbname=$DB_NAME", "$USER", "$PASSWORD");
session_start();

?>