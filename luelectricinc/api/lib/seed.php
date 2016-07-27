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
    // CryptoService::createAccount("admin", "actuallyNew@44x!!");
    CryptoService::createAccount("admin", "admin");
    for($i = 1; $i <= 5; $i++){
        $json = array
        (
            'jobDescription' => "job desc $i",
            'aboutLu' => "about lu $i",
            'status' => "active",
            'contractType' => "The contract type $i",
            'additionalInfo' => "additional info about the job $i",
            'jobTitle' => "Job Title $i",
            'application' => "someb64Data $i",
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
