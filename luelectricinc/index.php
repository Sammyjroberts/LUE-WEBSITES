<!DOCTYPE html>
<html lang="en">
<!-- ROUTES -->
<?php
  define("CAREER_CONTACT", "careers@luelectricinc.com");
  $pageParam = $_GET['page'];
  $id        = $_GET['id'];
  //content to be shot into main div
  $content;
  switch ($pageParam) {
    case '' :
      $content = 'home.php';
      $pageParam = 'home';
      break;
    case 'home':
      $content = 'home.php';
      break;
    case 'about':
      $content = 'about.php';
      break;
    case 'careers':
      $content =  'careers.php';
      if(!empty($_GET['id']) && isset($_GET['id'])){
          $showCareers = true;
          $id = $_GET['id'];
      }
      break;
    case 'services':
      $content = 'services.php';
      break;
    case 'about':
      $content = 'about.php';
      break;
    case 'contact':
      $content = 'contact.php';
      break;
    case 'residental-general-electrician-app':
      $content = 'residental-general-electrician-app.php';
      break;
    case 'electrical-apprentice-app':
      $content = 'electrical-apprentice-app.php';
      break;
    case 'electrical-foreman-app':
      $content = 'electrical-foreman-app.php';
      break;
    default:
      $content = '404.php';
      break;
  }
 ?>
<head>

    <meta charset="utf-8">
    <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge"> -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>L.U. Electric Inc.</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/custom.css">
    <!-- Custom CSS -->
    <link href="css/modern-business.css" rel="stylesheet">
    <link href="css/service.css" rel="stylesheet">
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- jQuery -->
    <script src="js/jquery.js"></script>


    <!-- brand slider -->
    <script type="text/javascript" src="js/jssor.slider-21.1.5.mini.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <script src="js/brands.js"></script>


    <!-- Custom Fonts -->

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <style>
        .navbar-inverse .navbar-nav>li>a{
            color: white;
        }
        .navbar-inverse .navbar-nav>li>a:hover {
            color: #E55E31;
        }
        .active-label-color {
          color: #E55E31 !important;
        }

    </style>
</head>

<body>
<!-- HEADER -->
<?php
require_once 'header.php';
 ?>
<!-- /HEADER -->

<!-- MAIN -->
<?php
require_once "$content";
//echo "<pre>$content</pre>";
 ?>
<!-- /MAIN -->

<!-- FOOTER -->
<?php
require_once 'footer.php';
 ?>
<!-- /FOOTER-->
</body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-80089923-1', 'auto');
  ga('send', 'pageview');

</script>


</html>
