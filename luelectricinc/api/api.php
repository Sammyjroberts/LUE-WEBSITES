<?php
header('Content-Type: application/json');

require_once './lib/dbCon.php';
require_once ('./model/job_posting.php');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$model         = $_GET['model'];
$id            = $_GET['id'];
if(isset($_GET['model']) && !empty($_GET['model'])){
    switch($model){
        case "careers" :
            switch($requestMethod){
                case "GET" :
                    if(isset($_GET['id']) && !empty($_GET['id'])){
                        JobPosting::getOne($id);
                    }
                    else{
                        JobPosting::getAll();
                    }
                break;
                case "POST" :
                    $data = file_get_contents("php://input");
                    JobPosting::post($data);
                break;
                case "PUT" :
                    //check to make sure that the Id is not null
                    if(isset($_GET['id']) && !empty($_GET['id'])){
                        $data = file_get_contents("php://input");
                        JobPosting::put($id, $data);
                    }
                    else{
                        JobPosting::error();
                    }
                break;
                case "DELETE" :
                    //check to make sure that the Id is not null
                    if(isset($_GET['id']) && !empty($_GET['id'])){
                        JobPosting::delete($id);
                    }
                    else{
                        JobPosting::error();
                    }
                break;
                default :
                    JobPosting::error();
                break;
            };
        break;
        default :
            JobPosting::error();
        break;
    };
}
else{
    JobPosting::error();
}
