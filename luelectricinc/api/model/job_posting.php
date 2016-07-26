<?php

class JobPosting {
    function __construct(){

    }

    static function post($data){
        $data = json_decode($data);
        $db = Db::getInstance();
        $query = <<<QUERY
        INSERT INTO `job_posting`
(`created_at`,`updated_at`,`job_description`,`location`,`qualifications`,`about_lu`,
`status`,`contract_type`,`additional_info`,`job_title`,`application`)
VALUES(NOW(),NOW(),:jobDescription,:location,:qualifications,:about_lu,:status,:contract_type,
:additional_info,:job_title,:application)
QUERY;
        $params = array
        (
            ':jobDescription'  => $data->jobDescription,
            ':location'        => $data->locations,
            ':qualifications'  => $data->qualifications,
            ':about_lu'        => $data->aboutLu,
            ':status'          => $data->status,
            ':contract_type'   => $data->contractType,
            ':additional_info' => $data->additionalInfo,
            ':job_title'       => $data->jobTitle,
            ':application'     => $data->application,
        );
        try{
            $sqlStatement = $db->prepare($query);
            $response = $sqlStatement->execute($params);
            $insertId = $db->lastInsertId();

            $returnObject = (array('id' => $insertId));
            $message = "Career POST Successful for $data->jobTitle";

            JobPosting::success($returnObject, $message);
        }
        catch(Exception $e){
            JobPosting::error($e->getMessage(), $e->getCode());
        }
    }

    static function put($id, $data){
        if(JobPosting::idExists($id)){
            $data = json_decode($data);
            $db = Db::getInstance();

            $query = <<<QUERY
UPDATE `job_posting`
SET
`updated_at` = NOW(),
`job_description` = :jobDescription,
`location` = :location,
`qualifications` = :qualifications,
`about_lu` = :about_lu,
`status` = :status,
`contract_type` = :contract_type,
`additional_info` = :additional_info,
`job_title` = :job_title,
`application` = :application
WHERE `id` = :id;
QUERY;
            $params = array
            (
                ':id'              => $id,
                ':jobDescription'  => $data->jobDescription,
                ':location'        => $data->locations,
                ':qualifications'  => $data->qualifications,
                ':about_lu'        => $data->aboutLu,
                ':status'          => $data->status,
                ':contract_type'   => $data->contractType,
                ':additional_info' => $data->additionalInfo,
                ':job_title'       => $data->jobTitle,
                ':application'     => $data->application,
            );

            try{
                $sqlStatement = $db->prepare($query);
                $res = $sqlStatement->execute($params);


                $returnObject = (array('id' => $id));
                $message = "Career PUT Successful for $data->jobTitle";

                JobPosting::success($returnObject, $message);
            }
            catch(Exception $e){
                JobPosting::error($e->getMessage(), $e->getCode());
            }
        }
        else{
            JobPosting::error("Id $id does not exist.", "400");
        }
    }

    static function getAll(){
        try{
            $db = Db::getInstance();
            $query = "SELECT id, created_at as createdAt, updated_at as updatedAt, job_description as jobDescription, location, qualifications, about_lu as aboutLu, status, contract_type as contractType, additional_info as additionalInfo, job_title as jobTitle, application FROM job_posting";
            $sqlStatement = $db->prepare($query);
            $res = $sqlStatement->execute();
            $response = $sqlStatement->fetchAll(PDO::FETCH_ASSOC);

            $message = "GET successful, {$sqlStatement->rowCount()} rows returned.";
            JobPosting::success($response, $message);
        }
        catch(Exception $e){
            JobPosting::error($e->getMessage(), $e->getCode());
        }
    }

    static function getOne($id){
        if(JobPosting::idExists($id)){
            try{
                $db = Db::getInstance();
                $query = "SELECT id, created_at as createdAt, updated_at as updatedAt, job_description as jobDescription, location, qualifications, about_lu as aboutLu, status, contract_type as contractType, additional_info as additionalInfo, job_title as jobTitle, application FROM job_posting where id = :id";
                $params = array
                (
                    ':id' => $id
                );
                $sqlStatement = $db->prepare($query);
                $res = $sqlStatement->execute($params);
                $response = $sqlStatement->fetch(PDO::FETCH_ASSOC);

                $message = "GET successful for id: $id";
                JobPosting::success($response, $message);
            }
            catch(Exception $e){
                JobPosting::error($e->getMessage(), $e->getCode());
            }
        }
        else{
            JobPosting::error("Id $id does not exist.", "400");
        }
    }


    static function delete($id){
        if(JobPosting::idExists($id)){
            try{
                $db = Db::getInstance();
                $query = "DELETE FROM job_posting where id = :id";
                $params = array
                (
                    ':id' => $id
                );
                $sqlStatement = $db->prepare($query);
                $res = $sqlStatement->execute($params);

                $response = array('id' => $id);
                $message = "DELETE Successful for id: $id";
                JobPosting::success($response, $message);
            }
            catch(Exception $e){
                JobPosting::error($e->getMessage(), $e->getCode());
            }
        }
        else{
            JobPosting::error("Id $id does not exist.", "400");
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
        if(!empty($error) && isset($error)){
            $response = array
            (
                'message' => $error,
                'code'    => $code
            );
        }
        else{
            array
            (
                'message' => $error
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
        echo json_encode($data);
    }

    static function idExists($id){
        $db = Db::getInstance();
        $query = "select id FROM job_posting where id = :id";
        $params = array
        (
            ':id' => $id
        );
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
        $rowCount = $sqlStatement->rowCount();
        if($rowCount > 0){
            return true;
        }
        else{
            return false;
        }
    }

}
