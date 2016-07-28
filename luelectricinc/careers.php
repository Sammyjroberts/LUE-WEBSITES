<?php

  if($showCareers) {
    require_once("./api/lib/dbCon.php");
    $db = Db::getInstance();
    $query = "SELECT id, created_at as createdAt, updated_at as updatedAt, job_description as jobDescription, location, qualifications as qualification, about_lu as aboutLu, status, contract_type as contractType, additional_info as additionalInfo, job_title as jobTitle, file_name as fileName, application FROM job_posting where id = :id";
    $params = array
    (
        ':id' => $id
    );
    $sqlStatement = $db->prepare($query);
    $res = $sqlStatement->execute($params);
    $job = $sqlStatement->fetch(PDO::FETCH_ASSOC);

    require_once "job-app-template.php";
  }
  else {
  ?>
    <!-- Page Content -->
    <div class="container">

        <!-- Page Heading/Breadcrumbs -->
        <p></p>
        <div class="row">
            <div class="col-lg-12">
                <h2 class="page-header">Careers</h2>
                <ol class="breadcrumb">
                    <li><a href="home">Home</a>
                    </li>
                    <li class="active">Careers</li>
                </ol>
            </div>
        </div>
        <div class="carousel-inner">
            <div class="item active">
                <img src="assets/teamwork_smaller.jpg" alt="" class="img-responsive servicebanner">
                <div class="custom-carousel-caption carousel-caption servicebannercaption mobile-hide" style = "height: 15%; left:10px; top: 80%">
                    <h3>Careers</h3>
                </div>
            </div>
        </div>
        <p></p>
        <p></p>
        <div class="col-md-12">

          <table class="table table-bordered table-striped table-hover" style = "text-align: center">
            <thead>
              <tr>
                <th>
                  Job Title
                </th>
                <th>
                  Location
                </th>
                <th>
                  Posting Date
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <?php
            $id = $_GET["id"];
             require_once './api/lib/dbCon.php';
             $db = Db::getInstance();
             $query = 'SELECT id, created_at as createdAt, updated_at as updatedAt, job_description as jobDescription, location, qualifications as qualification, about_lu as aboutLu, status, contract_type as contractType, additional_info as additionalInfo, job_title as jobTitle, application FROM job_posting';
             $sqlStatement = $db->prepare($query);
             $res = $sqlStatement->execute();
             $response = $sqlStatement->fetchAll(PDO::FETCH_ASSOC);
             foreach ($response as $row) {
                 $locStr = str_replace('$', ' - ', $row['location']);
                $formattedDate = date("m/d/y", strtotime($row['updatedAt']));
                 echo <<<html
              <tr>
               <td>
                 {$row['jobTitle']}
               </td>
               <td>
                  $locStr
               </td>
               <td>
                 $formattedDate
               </td>
               <td>
                 <a class = "btn btn-default" href="careers/{$row['id']}">Apply!</a>
               </td>
             </tr>
html;
             }
            ?>
            <caption><small>Don't see a position that fits you? Apply anyway: send a resume to <a href="mailto:<?php echo CAREER_CONTACT ?>"><?php echo CAREER_CONTACT?></a></small></caption>
          </table>
        </div>
    </div>

    </div>
<?php } ?>
