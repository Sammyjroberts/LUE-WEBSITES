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
                        JobPosting::error("An id is required for PUT", "400");
                    }
                break;
                case "DELETE" :
                    //check to make sure that the Id is not null
                    if(isset($_GET['id']) && !empty($_GET['id'])){
                        JobPosting::delete($id);
                    }
                    else{
                        JobPosting::error("An id is required for DELETE", "400");
                    }
                break;
                default :
                    JobPosting::error("Invalid HTTP method. only REST is supported.", "400");
                break;
            };
        break;
        default :
            JobPosting::error("Invalid Model. You must specify a supported model as a URL parameter.", "400");
        break;
    };
}
else{
    JobPosting::error();
}
