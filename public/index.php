<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

function jsDump($var) {
    echo "<script>console.log(" . json_encode($var) . ")</script>";
}

function jPath($str) {
    return realpath(getcwd() . "/../" . $str);
}
$paths = json_decode(file_get_contents(jPath("config/paths.json")));

$keywords = json_decode(file_get_contents(jPath("config/keywords.json")));
include jPath("bin/routing.php");
?>

