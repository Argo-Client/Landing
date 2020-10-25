<?php
$pages = json_decode(file_get_contents(jPath("config/pages.json")));
$req = $_SERVER["REQUEST_URI"];
if (strlen($req) > 1) {
    $req = preg_replace("/^\//", "", $req);
}
$page = isset($pages->$req) ? $pages->$req : $pages->notFound;
$title = $page->title;
$doc = isset($page->doc) ? $page->doc : $req;
$document = jPath("{$paths->views}/$doc.php");
include jPath("{$paths->views}/layout.php");
