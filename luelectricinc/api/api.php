<?php

/*****************************************
 *           Careers REST API
 * Full documentation on this can be found
 * on the github readme information here:
 * https://github.com/kekeoki/lue-websites/
 *
 *            Author: Brett Korp
 *             Date: 7/25/2016
 * ----------------------------------------
 *  Please note that these routes are all authenticated.
 *  *with exception of the /auth/ route. More info on
 *  *this below. Keep Reading.
 *
 * Careers Route
 * GET (all) /api/api.php?model=careers
 * GET (one) /api/api.php?model=careers&id=1
 * POST /api/api.php?model=careers
 * PUT /api/api.php?model=careers&id=1
 * DELETE /api/api.php?model=careers&id=1
 *
 * Auth Route
 * POST /api/api.php?model=auth
 *
 * -----------------------------------------
 * This API returns JSON in the following format:
 * Each response (whether it be an error or success)
 * Will look like this. There are only ever two statuses
 * returned from the API:
 * 200 for success
 * 400 for error.
 *
 * Example of an Error:
 * {
 * "response": {
 *     "status": "400",
 *     "successful": "false",
 *     "message": "Error in your REST request. Please try again.",
 *     "data": {
 *       "message": "Invalid login information.",
 *       "code": "400"
 *     }
 *   }
 * }
 *
 * The actual data from a SQL query is returned in the data object
 * So response.data (Inspiration taken from Dennis's API for LUE-ADMIN)
 * will have the actual data object you can use.
 *
 * Here is an example success response, the route used is listed below.
 * Route: http://luelectricinc.com/api/api.php?model=careers&id=5
 * More post objects can be see on the readme mentioned above.
 *
 * {
 * "response": {
 *    "status": "200",
 *    "successful": "true",
 *    "message": "GET successful for id: 5",
 *     "data": {
 *       "id": "5",
 *       "created_at": "2016-07-21 14:13:13",
 *       "updated_at": "2016-07-22 11:13:13",
 *       "job_description": "some job desc here.. blah blah",
 *       "location": "Orange County, CA$Los Angeles, CA$San Francisco, CA$",
 *       "qualifications": "qual1$qual2$qual3$qual4$",
 *       "about_lu": "About LU Electric..",
 *       "status": "active",
 *       "contract_type": "Full-Time",
 *       "additional_info": "L.U. Electric, Inc. is a.. etc",
 *       "job_title": "Electrical Apprentice",
 *       "application": "b64 data for the application PDF"
 *     }
 *   }
 * }
 *
 *          Lets talk about Authentication
 * you must include the jwt returned form this route to
 * access protected routes. You can get it below from this route.
 *
 * Also please not the the password is stored on the database
 * as an encrypted hash with a randomly generated salt.
 *
 * Check to see for yourself in the db. Also, the username and
 * password should be found in the IT documentation. If you don't
 * know how to get this, then ask someone who does.
 *
 * POST /api/api.php?model=auth
 * {
 *    "username" : "username",
 *     "password" : "password"
 * }
 */
//
// header('Access-Control-Allow-Headers: Content-Type');
// header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
// header('Access-Control-Allow-Origin: *');

header('Content-Type: application/json');

require_once ('./lib/dbCon.php');
require_once ('./lib/php-jwt/src/JWT.php');
require_once ('./lib/php-jwt/src/BeforeValidException.php');
require_once ('./lib/php-jwt/src/ExpiredException.php');
require_once ('./lib/php-jwt/src/SignatureInvalidException.php');
require_once ('./model/auth.php');
require_once ('./lib/crypto.php');
require_once ('./model/job_posting.php');

$requestMethod = $_SERVER['REQUEST_METHOD'];
$model         = $_GET['model'];
$id            = $_GET['id'];

$headers = getallheaders();
$token = $headers['Authorization'];
    if(isset($_GET['model']) && !empty($_GET['model'])){
        switch($model){
            case "careers" :
                if(Authentication::validateToken($token)){
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
                } //end if
            break;
            case "auth" :
                switch($requestMethod){
                    case "POST":
                        $data = file_get_contents("php://input");
                        Authentication::post($data);
                    break;
                    default :
                        JobPosting::error("Invalid.", "400");
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
