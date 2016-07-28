<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require('./dbCon.php');
require('./crypto.php');
require('../model/job_posting.php');

function dropTables(){
    $db = Db::getInstance();
    $tables = array
    (
        'job_posting',
        'users'
    );
    foreach($tables as $table){
        $query = "DROP TABLE IF EXISTS $table";
        $sqlStatement = $db->prepare($query);
        $sqlStatement->execute();
    }
}

function createJobPostings(){
    $sql = <<<SQL
    CREATE TABLE IF NOT EXISTS `job_posting` (
      `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
      `created_at` timestamp NULL DEFAULT NULL,
      `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
      `job_description` text NOT NULL,
      `location` text,
      `qualifications` text,
      `about_lu` text NOT NULL,
      `status` enum('active','inactive') DEFAULT 'active',
      `contract_type` enum('Full-Time','Part-Time') DEFAULT NULL,
      `additional_info` text,
      `job_title` tinytext NOT NULL,
      `file_name` tinytext,
      `application` longblob,
      PRIMARY KEY (`id`)
    ) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=0 ;
SQL;

    $db = Db::getInstance();
    $sqlStatement = $db->prepare($sql);
    $sqlStatement->execute();
}

function createUsers(){
    $sql = <<<SQL
    CREATE TABLE IF NOT EXISTS `users` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `username` varchar(255) NOT NULL,
      `salt` varchar(255) NOT NULL,
      `hash` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;
SQL;

    $db = Db::getInstance();
    $sqlStatement = $db->prepare($sql);
    $sqlStatement->execute();
}

function seedUsers(){
    CryptoService::createAccount("admin", "lue@careers123!");
    //CryptoService::createAccount("admin", "admin");
    for($i = 1; $i <= 0; $i++){
        $json = array
        (
            'jobDescription' => "job desc $i",
            'aboutLu' => "about lu $i",
            'status' => "active",
            'contractType' => "The contract type $i",
            'additionalInfo' => "additional info about the job $i",
            'jobTitle' => "Job Title $i",
            'fileName' => "seedFile.pdf",
            'application' => "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Y2VzIDExIDAgUgovTWVkaWFCb3hbIDAgMCA2MTIgNzkyIF0KL0tpZHNbIDEgMCBSIF0KL0NvdW50IDE+PgplbmRvYmoKCjEyIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyA0IDAgUgovT3BlbkFjdGlvblsxIDAgUiAvWFlaIG51bGwgbnVsbCAwXQovTGFuZyhlbi1VUykKPj4KZW5kb2JqCgoxMyAwIG9iago8PC9DcmVhdG9yPEZFRkYwMDU3MDA3MjAwNjkwMDc0MDA2NTAwNzI+Ci9Qcm9kdWNlcjxGRUZGMDA0QzAwNjkwMDYyMDA3MjAwNjUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDIwMDAzNTAwMkUwMDMwPgovQ3JlYXRpb25EYXRlKEQ6MjAxNjA3MjgxMDQ3MjktMDcnMDAnKT4+CmVuZG9iagoKeHJlZgowIDE0CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwNjEyOCAwMDAwMCBuIAowMDAwMDAwMDE5IDAwMDAwIG4gCjAwMDAwMDAxOTcgMDAwMDAgbiAKMDAwMDAwNjI3MSAwMDAwMCBuIAowMDAwMDAwMjE3IDAwMDAwIG4gCjAwMDAwMDUzMDcgMDAwMDAgbiAKMDAwMDAwNTMyOCAwMDAwMCBuIAowMDAwMDA1NTIzIDAwMDAwIG4gCjAwMDAwMDU4NTAgMDAwMDAgbiAKMDAwMDAwNjA0MSAwMDAwMCBuIAowMDAwMDA2MDczIDAwMDAwIG4gCjAwMDAwMDYzNzAgMDAwMDAgbiAKMDAwMDAwNjQ2NyAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgMTQvUm9vdCAxMiAwIFIKL0luZm8gMTMgMCBSCi9JRCBbIDwzOTc3NEI1NDJENkU0QTk3RDNDMjI2MTQwOTRENkM5RD4KPDM5Nzc0QjU0MkQ2RTRBOTdEM0MyMjYxNDA5NEQ2QzlEPiBdCi9Eb2NDaGVja3N1bSAvMjBFRUIxREY5MjgxNEFGN0IwQTNBRTlEQzRERjIyODgKPj4Kc3RhcnR4cmVmCjY2NDIKJSVFT0YK",
            'location' => 'Orange County, CA$Los Angeles, CA$San Francisco, CA$New Kid, CA',
            'contractType' => 'Full-Time',
            'qualification' => 'qual1$qual2$qual3$qual4$qual5'
        );
        $json = json_encode($json);
        JobPosting::post($json);
    }
}

/////////////////MAIN SCRIPT CODE
dropTables();
createJobPostings();
createUsers();
seedUsers();
