<?php
$careerContact = CAREER_CONTACT;
$quals = explode("$",$job['qualification']);
$formattedLocation = str_replace('$', ' - ', $job['location']);
echo <<<html
<!-- Page Content -->
<div class="container">
    <!-- Page Heading/Breadcrumbs -->

    <div class="row">
        <div class="col-lg-12">
            <h2 class="page-header">Apply</h2>
            <ol class="breadcrumb">
                <li><a href="home">Home</a>
                </li>
                <li><a href="careers">Careers</a></li>
                <li class="active">Apply</li>
            </ol>
        </div>
    </div>

    <div class="row">
      <div class="col-lg-12">


        <h1 class = "page-header">{$job['jobTitle']} <small>{$job['contractType']} <br>{$formattedLocations}</small></h1>
        <div class="panel panel-default">
          <div class="panel-body">
            <h5 class = "page-header">About L.U. ELECTRIC, INC.</h5>
            <p>
              {$job['aboutLu']}
            </p>
            <h5 class = "page-header">Job Description</h5>
            <p>
              {$job['jobDescription']}
            </p>
            <h5 class="page-header">Preferred Qualifications</h5>
            <ul>
html;
              foreach ($quals as $qual) {
                echo "<li>" . $qual . "</li>";
              }
      echo <<<html
            </ul>
            <h5 class = "page-header">Job Application</h5>
            <a target="_blank" title="Download {$job['fileName']}" download="{$job['fileName']}" href="data:application/octet-stream;charset=utf-16le;base64,{$job['application']}"><i class="fa fa-2x fa-file-pdf-o"></i></a>
               <br>Please download the application, fill it out and email to: <a href="mailto:$careerContact">$careerContact</a>
               </p>

            <h5 class = "page-header">Additional information</h5>
              <p>{$job['additionalInfo']}
              <br><b>Please email resume to <a href="mailto:$careerContact">$careerContact</a><b>
              </p>
          </div>
      </div>
    </div>
  </div>
</div>
html;
