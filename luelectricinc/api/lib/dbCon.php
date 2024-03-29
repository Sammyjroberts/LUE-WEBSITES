<?php
/**
 * Created by PhpStorm.
 * User: Brett
 * Date: 6/15/2016
 * Time: 5:14 PM
 */

 $prod = false;

class Db {
    private static $instance = NULL;

    private function __construct() {}

    private function __clone() {}

    public static function getInstance() {
        if (!isset(self::$instance)) {
            $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
            if($prod){
                self::$instance = new PDO('mysql:host=localhost;dbname=lue_career', 'lue_root', 'root@root.com', $pdo_options);
            }
            else{
                self::$instance = new PDO('mysql:host=localhost;dbname=lue_career', 'root', 'root', $pdo_options);
            }
        }
        return self::$instance;
    }
}
