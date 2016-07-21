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
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
        $response = $sqlStatement->fetchObject();
        echo $response;
    }

    static function put($id, $data){
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
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);

        $response = $sqlStatement->fetchObject();
        echo json_encode($response);
    }

    static function getAll(){
        $db = Db::getInstance();
        $query = "SELECT * FROM job_posting";
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute();
        $response = $sqlStatement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
    }

    static function getOne($id){
        $db = Db::getInstance();
        $query = "SELECT * FROM job_posting where id = :id";
        $params = array
        (
            ':id' => $id
        );
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
        $response = $sqlStatement->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($response);
    }


    static function delete($id){
        $db = Db::getInstance();
        $query = "DELETE FROM job_posting where id = :id";
        $params = array
        (
            ':id' => $id
        );
        $sqlStatement = $db->prepare($query);
        $res = $sqlStatement->execute($params);
        $response = $sqlStatement->fetchAll();
    }

    static function error(){
        http_response_code(400);
        $response = array
        (
            'error' => array
            (
                'message' => 'Error in your REST request. Please try again.',
                'status' => '400'
            )
        );

        echo json_encode($response);
    }


}
