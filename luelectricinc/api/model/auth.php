<?php
use \Firebase\JWT;
class Authentication {
    function __construct(){

    }

    static function post($data){
        $data = json_decode($data);
        $isAuthenticated = CryptoService::authenticateUser($data->username, $data->password);

        if($isAuthenticated){
            $jwt = Authentication::generateToken();

            Authentication::success( array('token' => $jwt), "User successfully authenticated");
        }
        else{
            Authentication::error("Invalid login information.", "400");
        }
    }

    /**
     * error - sends a JSON error object
     * usually you pass in the attributes of a PDO
     * exception object caught in a try catch block from
     * executing a PDO statement.
     *
     * @param  $error the PDO general error message
     * @param  $code  the PDO error code
     */
    static function error($error, $code){
        http_response_code(400);
        $response = array
        (
            'response' => array
            (
                'status'     => '400',
                'successful' => 'false',
                'message'    => 'Error in your REST request. Please try again.'
            )
        );
        if(!empty($error) && isset($error)){
            $response['response']['data'] = array
            (
                'message' => $error,
                'code'    => $code
            );
        }

        echo json_encode($response);
    }


    /**
     * success - the success response object returned
     * as a json object.
     *
     * NOTE: the object will be returned with data
     * this data is the response from the DB
     * for post and put requests, the id is returned
     * for get and Delete requests return the object
     *
     * @param  {Array} $data the data returnd from the API
     * @param  $message the message to put in the response
     */
    static function success($data, $message){
        http_response_code( 200 );
        $response = array
        (
            'response' => array
            (
                'status'  => '200',
                'successful' => 'true',
                'message' => $message,
                'data'    => $data
            )
        );
        echo json_encode($response);
    }

    static function generateToken(){

        //generate token and return
        $key = "areYouNewKid?";

        $date = new DateTime();
        $currentTime = $date->getTimestamp();

        $expirationTime = $currentTime + (60*60*12);

        $token = array
        (
            'iat' => $currentTime,
            'exp' => $expirationTime
        );

        $jwt = \Firebase\JWT\JWT::encode($token, $key);

        return $jwt;
    }

    static function validateToken($token){
        try{
            $key = "areYouNewKid?";
            $token = trim(str_replace("Bearer", "", $token));
            $decoded = \Firebase\JWT\JWT::decode($token, $key, array('HS256'));
            return true;

            // $issuedStamp = $decoded->iat;
            // $expirationStamp = $decoded->exp;
            //
            // $issuedDate = new DateTime();
            // $expirationDate = new DateTime();
            //
            // $issuedDate->setTimestamp($issuedStamp);
            // $expirationDate->setTimestamp($expirationStamp);
            //
            // echo $issuedDate->format('U = Y-m-d H:i:s');
            // echo $expirationDate->format('U = Y-m-d H:i:s');
            //
            // if($issuedDate > $expirationDate){
            //     return false;
            // }
            // else{
            //     return true;
            // }
        }
        catch(\Firebase\JWT\ExpiredException $e){
            $message = 'JWT Error: Exception: '.  $e->getMessage();
            Authentication::error($message, '400');
            return false;
        }
        catch(\Firebase\JWT\SignatureInvalidException $e){
            $message = 'JWT Error: Exception: '.  $e->getMessage();
            Authentication::error($message, '400');
            return false;
        }
        catch(\Firebase\JWT\BeforeValidException $e){
            $message = 'JWT Error: Exception: '.  $e->getMessage();
            Authentication::error($message, '400');
            return false;
        }
        catch(Exception $e){
            $message = 'JWT Error: Exception: '. $e->getMessage();
            Authentication::error($message, '400');
            return false;
        }
    }

}
