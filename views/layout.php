<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="language" content="NL">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="/dist/main.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta property="og:type" content="website">
    <meta name="keywords" content="<?= $keywords->keywords?>">

    <meta name="subject" content="<?= $keywords->title?>">
    <meta property="og:title" content="<?= $keywords->title?>">

    <meta property="og:image" content="<?= $keywords->img?>">
    <meta property="twitter:image" content="<?= $keywords->img?>">
    
    <meta property="og:description" content="<?= $keywords->description?>">
    <meta name="description" content="<?= $keywords->description?>">
</head>

<body class="grey darken-4 white-text">
    <?php
    include jPath("elements/nav.html");
    include $document;
    include jPath("elements/footer.html");
    ?>
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="/materializejs/materialize.min.js"></script>
    <script src="/dist/index.prod.js"></script>
</body>

</html>