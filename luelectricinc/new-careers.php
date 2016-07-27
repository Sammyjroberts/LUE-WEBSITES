<?php
 require_once("./api/lib/dbCon.php");
 $db = Db::getInstance();
 $query = "SELECT id, created_at as createdAt, updated_at as updatedAt, job_description as jobDescription, location, qualifications as qualification, about_lu as aboutLu, status, contract_type as contractType, additional_info as additionalInfo, job_title as jobTitle, application FROM job_posting";
 $sqlStatement = $db->prepare($query);
 $res = $sqlStatement->execute();
 $response = $sqlStatement->fetchAll(PDO::FETCH_ASSOC);
 foreach ($response as $row) {

echo <<<html
   <td>
     {$row['jobTitle']}
   </td>
   <td>
     {$row['location']}
   </td>
   <td>
     {$row['updatedAt']}
   </td>
   <td>
     <a class = "btn btn-default" href="/electrical-apprentice-app">Apply!</a>
   </td>
 </tr>
 <tr>
html;
 }
?>
