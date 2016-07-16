
<!-- Navigation -->
<nav class="navbar navbar-inverse navbar-custom navbar-fixed-top" role="navigation">
    <div class="row topdesc" style='text-align: right; background-color: #E7E6E6; color: #454545; padding-right: 10%; white-space: nowrap; font-size: 12px'>17762 Mitchell N, Irvine, 92614 <span style="padding-left: 10pt"><span> <i class="fa fa-phone"></i>(949) 536-3200</span></span></div>

    <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand navbar-brandcustom" href="index.html"><img src="assets/LUELogoBig.png"></a>
            <!--<a class="navbar-brand" href="index.html" style='font-size: 16pt;color: #CF000F'><strong>L.U. <span style="color:white;">Electric Inc.</span></strong></a> -->
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right" style="text-shadow:none;">
                <li <?php if($pageParam == "home"){echo 'class = "active"';}  ?>>
                    <a href="index.php"
                    <?php if($pageParam == "home"){echo 'class = "active-label-color"';}  ?>
                    >HOME</a>
                </li>
                <li <?php if($pageParam == "services"){echo 'class = "active"';}  ?>>
                    <a href="services.php"
                    <?php if($pageParam == "services"){echo 'class = "active-label-color"';}  ?>
                    >SERVICES</a>
                </li>
                <li <?php if($pageParam == "about"){echo 'class = "active"';}  ?>>
                    <a href="about.html"
                    <?php if($pageParam == "about"){echo 'class = "active-label-color"';}  ?>
                    >ABOUT US</a>
                </li>
                <li <?php if($pageParam == "contact"){echo 'class = "active"';}  ?>>
                    <a href="contact.html"
                    <?php if($pageParam == "contact"){echo 'class = "active-label-color"';}  ?>
                    >CONTACT</a>
                </li>
                <li <?php if($pageParam == "careers"){echo 'class = "active"';}  ?>>
                    <a href="careers.html"
                    <?php if($pageParam == "careers"){echo 'class = "active-label-color"';}  ?>
                    >CAREERS</a>
                </li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>